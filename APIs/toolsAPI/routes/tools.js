const express = require('express');
const toolController = require('../controllers/toolController');
const router = express.Router();

// get all tools for a user
router.get('/user/:user_id', toolController.getToolsByUser, (req, res) => {
  res.status(200).json(res.locals);
});


/* /:id routes to get or update info for a specific user*/
router.get('/:tool_id', toolController.getToolById, (req, res) => {
  res.status(200).json(res.locals);
});

// create new tool
router.put('/', toolController.createNewTool, (req, res) => {
  res.status(200).json(res.locals);
});

//add like to tool
router.put('/like/:tool_id', toolController.addLikeToTool, (req, res) => {
  res.status(200).json(res.locals);
})

//change status of tool to available/unavailable
router.put('/available/:tool_id', toolController.changeToolAvailability, (req, res) => {
  res.status(200).json(res.locals);
})

// delete a tool
router.delete('/:tool_id', toolController.deleteToolById, (req, res) => {
  res.status(200).json(res.locals);
});

// get tools in a city
router.get('/city/:city', toolController.getToolsByCity, (req, res) => {
  res.status(200).json(res.locals);
});


module.exports = router;
