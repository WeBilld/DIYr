const express = require('express');
const toolController = require('../controllers/toolController');
const router = express.Router();

// get all tools for a user
router.get('/:user_id', toolController.getToolsByUser, (req, res) => {
  res.status(200).json(res.locals);
});


/* /:id routes to get or update info for a specific user*/
router.get('/:tool_id', toolController.getToolById, (req, res) => {
  res.status(200).json(res.locals);
});

router.put('/', toolController.createNewTool, (req, res) => {
  res.status(200).json(res.locals);
});

router.delete('/:tool_id', toolController.deleteToolById, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/:city', toolController.getToolsByCity, (req, res) => {
  res.status(200).json(res.locals);
});


module.exports = router;
