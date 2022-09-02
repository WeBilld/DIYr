const db = require('../models/database');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userController = {};

userController.checkUser = async (req, res, next) => {
  // this is only used when a user signs up for a new account
  // gets email from request body
  // if email is already in db, throw error
  // else if email is available, proceed

  try {
    const { email } = req.body;

    const findUserQuery = `
    SELECT _id FROM users
    WHERE email = $1`;

    const checkMail = await db.query(findUserQuery, [email]);
    if (checkMail.rows.length > 0) {
      // return res.status(403).send('There is already an account associated with this email address.');
      res.locals.mailError = true;
      console.error(
        'There is already an account associated with this email address.'
      );
    }

    return next();
  } catch (err) {
    return next({
      log: `userController.checkUser: ERROR ${err}`,
      message: {
        err: 'userController.checkUser: ERROR: Check server logs for details.'
      }
    });
  }
};
userController.createUser = async (req, res, next) => {
  // takes in username, password, email, firstname, lastname, city from request
  // hashes password with salt
  // then send the insert query to the database

  try {
    const { email, password, firstName, lastName, city } = req.body;
    // if (!regex.test(username) || !regex.test(password)) throw 'Username and/or password are blank.';
    console.log(req.body);
    const hashPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    console.log(hashPassword);
    const sqlQuery = `
    INSERT INTO users (first_name, last_name, email, city, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
    _id, first_name, last_name, email, city`;

    const response = await db.query(sqlQuery, [
      firstName,
      lastName,
      email,
      city,
      hashPassword
    ]);
    res.locals = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `userController.createUser: ERROR: ${error}`,
      message: {
        err: 'userController.createUser: ERROR: Check server logs for details.'
      }
    });
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, city, info, imageUrl } = req.body;
    const userId = res.locals.userID;

    const updateUserQuery = `
    UPDATE users
    SET
    first_name = $1,
    last_name = $2,
    email = $3,
    city = $4,
    info = $5,
    imageUrl = $6
    WHERE _id = $7
    RETURNING *`;

    const response = await db.query(updateUserQuery, [
      firstName,
      lastName,
      email,
      city,
      info,
      imageUrl,
      userId
    ]);
    res.locals = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `userController.updateUser: ERROR: ${error}`,
      message: {
        err: 'userController.updateUser: ERROR: Check server logs for details.'
      }
    });
  }
};

userController.loginUser = async (req, res, next) => {
  // takes in email and password in request
  // sends query to database to pull all user info for this user
  // compares the hash of the password with the hash stored in database
  // then store all user data in res.locals

  try {
    const { email, password } = req.body;
    // if (regex.test(username) || regex.test(password)) throw 'Username and/or password are blank.';

    const loginQuery = 'SELECT * FROM users WHERE email = $1';

    const response = await db.query(loginQuery, [email]);
    const match = await bcrypt.compare(password, response.rows[0].password);
    if (!match)
      return res
        .status(403)
        .send('You have entered invalid email or password.');
    res.locals = {
      user_id: response.rows[0]._id,
      email: response.rows[0].email,
      first_name: response.rows[0].first_name,
      last_name: response.rows[0].last_name,
      city: response.rows[0].city,
      info: response.rows[0].info,
      profile_image_url: response.rows[0].profile_image_url,
      num_supporters: response.rows[0].num_supporters,
      created_at: response.rows[0].created_at
    };
    return next();
  } catch (error) {
    return next({
      log: `userController.loginUser: ERROR: ${error}`,
      message: {
        err: 'userController.loginUser: ERROR: Check server logs for details.'
      }
    });
  }
};

userController.findOneByUserId = async (req, res, next) => {
  // req.user is set up in the jwt.verifyToken controller
  const userId = res.locals.userID;
  try {
    const findUserIdQuery = `
    SELECT
	    *
    FROM
	    users
    WHERE
	    _id = $1`;

    const response = await db.query(findUserIdQuery, [userId]);
    if (response.rows.length < 1) {
      throw {
        log: `User with id: ${userId} could not be found.`,
        status: 404,
        message: `User with id: ${userId} could not be found.`
      };
    }

    res.locals = {
      user_id: response.rows[0]._id,
      email: response.rows[0].email,
      first_name: response.rows[0].first_name,
      last_name: response.rows[0].last_name,
      city: response.rows[0].city,
      info: response.rows[0].info,
      profile_image_url: response.rows[0].profile_image_url,
      num_supporters: response.rows[0].num_supporters,
      created_at: response.rows[0].created_at
    };
    return next();
  } catch (error) {
    return next({
      log: `userController.findOneByUserId: ERROR: ${error.log}`,
      message: {
        err: `${error.message
            ? error.message
            : 'userController.findOneByUserId: ERROR: Check server logs for details.'
          }`
      },
      status: error.status ? error.status : 500
    });
  }
};

// follow user by id
userController.followUser = async (req, res, next) => {
  const { followeeId } = req.body;
  const followerId = req.user;

  try {
    const followUserQuery = `
    INSERT INTO followee_follower (followee_id, follower_id)
    VALUES ($1, $2)
    RETURNING *`;

    const response = await db.query(followUserQuery, [followeeId, followerId]);
    res.locals.follow = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `userController.followUser: ERROR: ${error}`,
      message: {
        err: 'userController.followUser: ERROR: Check server logs for details.'
      }
    });
  }
};

// unfollow user by id
userController.unfollowUser = async (req, res, next) => {
  const { followeeId } = req.body;
  const followerId = req.user;

  try {
    const unfollowUserQuery = `
    DELETE FROM followee_follower
    WHERE followee_id = $1 AND follower_id = $2`;

    const response = await db.query(unfollowUserQuery, [
      followeeId,
      followerId
    ]);
    res.locals.follow = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `userController.unfollowUser: ERROR: ${error}`,
      message: {
        err: 'userController.unfollowUser: ERROR: Check server logs for details.'
      }
    });
  }
};

// retrieve all users followed by a particular user
userController.getFollowees = async (req, res, next) => {
  const { followerId } = req.body;

  try {
    const getFolloweesQuery = `
    SELECT followee_id
    FROM followee_follower
    WHERE follower_id = $1`;

    const response = await db.query(getFolloweesQuery, [followerId]);
    res.locals.followees = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `userController.getFollowees: ERROR: ${error}`,
      message: {
        err: 'userController.getFollowees: ERROR: Check server logs for details.'
      }
    });
  }
};

// retrieve all of a particular user's followers
userController.getFollowers = async (req, res, next) => {
  const { followeeId } = req.body;

  try {
    const getFollowersQuery = `
    SELECT follower_id
    FROM followee_follower
    WHERE followee_id = $1`;

    const response = await db.query(getFollowersQuery, [followeeId]);
    res.locals.followers = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `userController.getFollowers: ERROR: ${error}`,
      message: {
        err: 'userController.getFollowers: ERROR: Check server logs for details.'
      }
    });
  }
};

module.exports = userController;
