const db = require('../models/database');

const transactionsController = {};

// retrieve all transactions for tools owned by a particular user
transactionsController.getTransactionsByOwner = async (req, res, next) => {
  const ownerId = req.params.owner_id;

  try {
    const getTransactionsByOwnerQuery = `
            SELECT
            *
            FROM transactions
            WHERE transactions.owner_id = $1`;

    const response = await db.query(getTransactionsByOwnerQuery, [ownerId]);
    res.locals.transactions = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `transactionsController.getTransactionsByOwner: ERROR: ${error}`,
      message: {
        err: 'transactionsController.getTransactionsByOwner: ERROR: Check server logs for details.'
      }
    });
  }
};

// retrieve all transactions for tools borrowed by a particular user
transactionsController.getTransactionsByBorrower = async (req, res, next) => {
  const borrowerId = req.params.borrower_id;

  try {
    const getTransactionsByBorrowerQuery = `
            SELECT
            *
            FROM transactions
            WHERE transactions.borrower_id = $1`;

    const response = await db.query(getTransactionsByBorrowerQuery, [
      borrowerId
    ]);
    res.locals.transactions = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `transactionsController.getTransactionsByBorrower: ERROR: ${error}`,
      message: {
        err: 'transactionsController.getTransactionsByBorrower: ERROR: Check server logs for details.'
      }
    });
  }
};

// retrieve all transactions for a particular tool
transactionsController.getTransactionsByTool = async (req, res, next) => {
  const toolId = req.params.tool_id;

  try {
    const getTransactionsByToolQuery = `
              SELECT
              *
              FROM transactions
              WHERE transactions.tool_id = $1`;

    const response = await db.query(getTransactionsByToolQuery, [toolId]);
    res.locals.transactions = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `transactionsController.getTransactionsByTool: ERROR: ${error}`,
      message: {
        err: 'transactionsController.getTransactionsByTool: ERROR: Check server logs for details.'
      }
    });
  }
};

// add a transaction when a request is approved
transactionsController.openTransaction = async (req, res, next) => {
  const { borrower_id, owner_id, tool_id } = req.body;

  try {
    const openTransactionQuery = `
        INSERT INTO transactions (borrower_id, owner_id, tool_id)
        VALUES ($1, $2, $3)
        RETURNING *`;

    const response = await db.query(openTransactionQuery, [
      borrower_id,
      owner_id,
      tool_id
    ]);
    res.locals.transaction = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `transactionsController.openTransaction: ERROR: ${error}`,
      message: {
        err: 'transactionsController.openTransaction: ERROR: Check server logs for details.'
      }
    });
  }
};

// update transaction status when item is returned
transactionsController.closeTransaction = async (req, res, next) => {
  const { transactionId } = req.body;

  try {
    const closeTransactionQuery = `
    UPDATE transactions
    SET completed = TRUE
    WHERE _id = $1`;

    const response = await db.query(closeTransactionQuery, [transactionId]);
    res.locals.request = response.rows;

    return next();
  } catch (error) {
    return next({
      log: `transactionController.closeTransaction: ERROR: ${error}`,
      message: {
        err: 'transactionController.closeTransaction: ERROR: Check server logs for details.'
      }
    });
  }
};

module.exports = transactionsController;
