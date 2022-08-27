const express = require('express');
const requestController = require('../controllers/requestController');
const requestRouter = express.Router();

// request to borrow a tool
requestRouter.post('/', requestController.requestToolById, (req, res) => {
  res.status(200).json(res.locals);
});

// retrieve requests by owner id
requestRouter.get(
  '/:owner_id',
  requestController.getRequestsByOwner,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// retrieve requests by borrower id
requestRouter.get(
  '/:borrower_id',
  requestController.getRequestsByBorrower,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// approve or reject a request for your tool
requestRouter.put('/', requestController.resolveRequest, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = requestRouter;
