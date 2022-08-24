const db = require('../models/database');
const queries = require('../models/queries');
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
      console.error('There is already an account associated with this email address.');
    };

    return next();
  } catch (err) {
    return next({
      log: `userController.checkUser: ERROR ${err}`,
      message: { err: 'userController.checkUser: ERROR: Check server logs for details.' }
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
    const hashPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);

    const sqlQuery = `
    INSERT INTO users (first_name, last_name, email, city, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
    _id, first_name, last_name, email, city`;

    const response = await db.query(sqlQuery, [firstName, lastName, email, city, hashPassword]);
    res.locals = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `userController.createUser: ERROR: ${error}`,
      message: { err: 'userController.createUser: ERROR: Check server logs for details.' }
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

    const loginQuery = queries.loginUser = 'SELECT * FROM users WHERE email = $1';

    const response = await db.query(loginQuery, [email]);
    const match = await bcrypt.compare(password, response.rows[0].password);
    if (!match) return res.status(403).send('You have entered invalid email or password.');
    res.locals = {
      user_id: response.rows[0]._id,
      email: response.rows[0].email,
      first_name: response.rows[0].first_name,
      last_name: response.rows[0].last_name,
      city: response.rows[0].city,
    };
    return next();
  }
  catch (error) {
    return next({
      log: `userController.loginUser: ERROR: ${error}`,
      message: { err: 'userController.loginUser: ERROR: Check server logs for details.' }
    });
  }
};

module.exports = userController;
