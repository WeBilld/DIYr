const db = require('../models/database');
const jwt = require('jsonwebtoken');
require('dotenv').config;


const jwtController = {};

jwtController.generateToken = async (req, res, next) => {
  try {
    const payload = {
      userId: res.locals.user_id
    };
    const options = {
      expiresIn: '3d',
    };
    // create new jwt token and send it back to client in a cookie, name token access_token
    const token = await jwt.sign(payload, process.env.SECRET_KEY, options);
    res.cookie('access_token', token, {
      httpOnly: true
    });

    return next();
  }
  catch (error) {
    return next({
      log: `jwtController.generateToken: ERROR: ${error}`,
      message: { err: 'jwtController.generateToken: ERROR: Check server logs for details.' }
    });
  }
};

jwtController.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json({error: 'No authorization!'});
    const decoded = await jwt.verify(token, process.env.SECRET_KEY, { maxAge: '3d' });
    // save userid in request
    res.locals.userID = decoded.userId;
    if (decoded) return next();
  } catch (error) {
    return next({
      log: `jwtController.verifyToken: ERROR: ${error}`,
      status: 403,
      message: { err: 'jwtController.verifyToken: ERROR: Check server logs for details.' }
    });
  }
};


module.exports = jwtController;
