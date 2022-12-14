const db = require('../models/database');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const toolController = {};

toolController.getToolsByUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = await jwt.verify(token, process.env.SECRET_KEY, { maxAge: '3d' });
  console.log('decoded:', decoded);

  const {userId} = decoded;
  try {

    const getToolsByUserQuery = `
    SELECT *
    FROM tools
    WHERE
	  tools.owner_id = $1`;

    const response = await db.query(getToolsByUserQuery, [userId]);
    res.locals.tools = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `toolController.getToolsByUser: ERROR: ${error}`,
      message: {
        err: 'toolController.getToolsByUser: ERROR: Check server logs for details.',
      },
    });
  }
};

toolController.getToolById = async (req, res, next) => {

  const toolId = req.params.tool_id;
  try {

    const getToolsById = `
    SELECT
	  tools._id as toolId,
	  tools.tool_name as toolName,
    tools.owner_id as ownerId,
	  tools.description as description,
    tools.available as available,
    tools.num_likes as numLikes,
    tools.created_at as createdAt
    FROM tools
    WHERE
	  tools._id = $1`;

    const response = await db.query(getToolsById, [toolId]);
    res.locals.tools = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `toolController.getToolById: ERROR: ${error}`,
      message: {
        err: 'toolController.getToolById: ERROR: Check server logs for details.',
      },
    });
  }
};

toolController.getToolsByCity = async (req, res, next) => {

  const city = req.params.city;

  // LIMIT number of tools returned to 20
  try {
    const getToolsByCity = `
    SELECT
	  tools._id as toolId,
	  tools.tool_name as toolName,
    tools.owner_id as ownerId,
	  tools.description as description,
    tools.available as available,
    tools.num_likes as numLikes,
    tools.created_at as createdAt
    FROM tools JOIN users
    ON tools.owner_id = users._id
    WHERE
	  users.city = $1
    LIMIT 20`;

    const response = await db.query(getToolsByCity, [city]);
    res.locals.tools = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `toolController.getToolByCity: ERROR: ${error}`,
      message: {
        err: 'toolController.getToolByCity: ERROR: Check server logs for details.',
      },
    });
  }
};


toolController.createNewTool = async (req, res, next) => {

  const { toolName, ownerId, description, imageUrl, available } = req.body;

  try {

    const createTool = `
    INSERT INTO tools (tool_name, owner_id, description, image_url, available)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

    const response = await db.query(createTool, [toolName, ownerId, description,
      imageUrl, available]);
    res.locals.tools = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `toolController.createNewTool: ERROR: ${error}`,
      message: {
        err: 'toolController.createNewTool: ERROR: Check server logs for details.',
      },
    });
  }
};

toolController.deleteToolById = async (req, res, next) => {

  const toolId = req.params.tool_id;
  try {

    const deleteToolById = `
    DELETE from tools WHERE _id = $1 RETURNING *`;

    const response = await db.query(deleteToolById, [toolId]);
    res.locals.tools = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `toolController.deleteToolById: ERROR: ${error}`,
      message: {
        err: 'toolController.deleteToolById: ERROR: Check server logs for details.',
      },
    });
  }
};

toolController.addLikeToTool = async (req, res, next) => {
  // be sure to add the user_id in the request body!
  const toolId = req.params.tool_id;
  const { userId } = req.body
  try {

    const addLikeToToolById = `
    UPDATE tools SET num_likes = num_likes + 1 WHERE _id = $1`;

    const response = await db.query(addLikeToToolById, [toolId]);

    const addToolLikeQuery = `
    INSERT INTO tool_likes (tool_id, user_id)
    VALUES ($1, $2)`;

    const response2 = await db.query(addToolLikeQuery, [toolId, userId]);

    res.locals.tools = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `toolController.addLikeToTool: ERROR: ${error}`,
      message: {
        err: 'toolController.addLikeToTool: ERROR: Check server logs for details.',
      },
    });
  }
};

toolController.removeLikeFromTool = async (req, res, next) => {
  // be sure to add the user_id in the request body!
  const toolId = req.params.tool_id;
  const { userId } = req.body
  try {

    const subtractLikeFromToolById = `
    UPDATE tools SET num_likes = num_likes - 1 WHERE _id = $1`;

    const response = await db.query(subtractLikeFromToolById, [toolId]);

    const removeToolLikeQuery = `
    DELETE from tool_likes WHERE tool_id = $1 AND user_id = $2 RETURNING *`;

    const response2 = await db.query(removeToolLikeQuery, [toolId, userId]);

    res.locals.tools = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `toolController.removeLikeFromTool: ERROR: ${error}`,
      message: {
        err: 'toolController.removeLikeFromTool: ERROR: Check server logs for details.',
      },
    });
  }
};

toolController.changeToolAvailability = async (req, res, next) => {

  const toolId = req.params.tool_id;
  try {

    const changeToolAvailabilityQuery = `
    UPDATE tools SET available = NOT available WHERE _id = $1`;

    const response = await db.query(changeToolAvailabilityQuery, [toolId]);
    res.locals.tools = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `toolController.changeToolAvailability: ERROR: ${error}`,
      message: {
        err: 'toolController.changeToolAvailability: ERROR: Check server logs for details.',
      },
    });
  }
};

module.exports = toolController;
