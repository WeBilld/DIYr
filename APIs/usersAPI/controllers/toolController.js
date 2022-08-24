const db = require('../models/database');

const toolController = {};

clubController.getToolsByUser = async (req, res, next) => {
  const userId = req.user_id;
  try {

    const getToolsByUserQuery = `
    SELECT
	  tools._id as toolId,
	  tools.tool_name as "toolName",
	  tools.description as description
    FROM
	  users
	  JOIN tools ON users._id = tools.owner_id
    WHERE
	  users._id = $1`;

    const response = await db.query(getToolsByUserQuery, [userId]);
    res.locals.clubs = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `clubController.getToolsByUser: ERROR: ${error}`,
      message: {
        err: 'clubController.getToolsByUser: ERROR: Check server logs for details.',
      },
    });
  }
};

module.exports = toolController;
