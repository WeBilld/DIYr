const express = require('express');
const requestController = require('../controllers/requestController');
const router = express.Router();

// request to borrow a tool
router.post('/', requestController.requestToolById, (req, res) => {
  res.status(200).json(res.locals);
});

// retrieve requests by owner id
router.get('/:owner_id', requestController.getRequestsByOwner, (req, res) => {
  res.status(200).json(res.locals);
});

// retrieve requests by borrower id
router.get(
  '/:borrower_id',
  requestController.getRequestsByBorrower,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// approve or reject a request for your tool
router.put('/', requestController.resolveRequest, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
