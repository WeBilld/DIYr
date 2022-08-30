const db = require('../models/database');

const requestController = {};

// add request to database
requestController.requestToolById = async (req, res, next) => {
  const { borrower_id, owner_id, tool_id } = req.body;

  try {
    const requestToolQuery = `
        INSERT INTO requests (borrower_id, owner_id, tool_id)
        VALUES ($1, $2, $3)
        RETURNING *`;

    const response = await db.query(requestToolQuery, [
      borrower_id,
      owner_id,
      tool_id
    ]);
    res.locals.request = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `requestController.requestToolById: ERROR: ${error}`,
      message: {
        err: 'requestController.requestToolById: ERROR: Check server logs for details.'
      }
    });
  }
};

// retrieve requests and borrower info using owner id
requestController.getRequestsByOwner = async (req, res, next) => {
  const ownerId = req.params.owner_id;

  try {
    const getRequestsByOwnerQuery = `
        SELECT *
        FROM requests
        JOIN users ON requests.borrower_id=users._id
        WHERE requests.owner_id = $1`;

    const response = await db.query(getRequestsByOwnerQuery, [ownerId]);
    res.locals.requests = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `requestController.getRequestsByOwner: ERROR: ${error}`,
      message: {
        err: 'requestController.getRequestsByOwner: ERROR: Check server logs for details.'
      }
    });
  }
};

// retrieve the number of unresolved requests using owner id
requestController.getNumUnresolvedRequests = async (req, res, next) => {
  const ownerId = req.params.owner_id;

  try {
    const getNumUnresolvedRequestsQuery = `
        SELECT requests._id
        FROM requests
        WHERE requests.owner_id = $1 AND requests.status='pending'`;

    const response = await db.query(getNumUnresolvedRequestsQuery, [ownerId]);
    res.locals.numUnresolvedRequests = response.rows.length;

    return next();
  } catch (error) {
    return next({
      log: `requestController.getNumUnresolvedRequests: ERROR: ${error}`,
      message: {
        err: 'requestController.getNumUnresolvedRequests: ERROR: Check server logs for details.'
      }
    });
  }
};

// retrieve requests using borrower id
requestController.getRequestsByBorrower = async (req, res, next) => {
  const borrowerId = req.params.borrower_id;

  try {
    const getRequestsByBorrowerQuery = `
          SELECT
          *
          FROM requests
          WHERE requests.borrower_id = $1 AND requests.status = 'pending'`;

    const response = await db.query(getRequestsByBorrowerQuery, [borrowerId]);
    res.locals.requests = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `requestController.getRequestsByBorrower: ERROR: ${error}`,
      message: {
        err: 'requestController.getRequestsByBorrower: ERROR: Check server logs for details.'
      }
    });
  }
};

// update request status in database
requestController.resolveRequest = async (req, res, next) => {
  const { requestId, status } = req.body;

  try {
    const resolveRequestQuery = `
        UPDATE requests
        SET status = $2
        WHERE _id = $1`;

    const response = await db.query(resolveRequestQuery, [requestId, status]);
    res.locals.request = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `requestController.resolveRequest: ERROR: ${error}`,
      message: {
        err: 'requestController.resolveRequest: ERROR: Check server logs for details.'
      }
    });
  }
};

module.exports = requestController;

