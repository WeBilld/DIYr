const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const transactionsRouter = express.Router();

// retrieve all transactions for tools owned by a particular user
transactionsRouter.get(
  '/:owner_id',
  transactionsController.getTransactionsByOwner,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// retrieve all transactions for tools borrowed by a particular user
transactionsRouter.get(
  '/:borrower_id',
  transactionsController.getTransactionsByBorrower,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// retrieve all transactions for a particular tool
transactionsRouter.get(
  '/:tool_id',
  transactionsController.getTransactionsByTool,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// add a transaction when a request is approved
transactionsRouter.post(
  '/',
  transactionsController.openTransaction,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// update transaction status when item is returned
transactionsRouter.put(
  '/',
  transactionsController.closeTransaction,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

module.exports = transactionsRouter;
