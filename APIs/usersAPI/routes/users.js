const express = require('express');
const userController = require('../controllers/userController');
const jwtController = require('../controllers/jwtController');
const router = express.Router();

// get all users
// router.get('/', (req, res) => {
//   res.status(200).json(res.locals);
// });

router.post(
  '/signup',
  userController.checkUser,
  userController.createUser,
  jwtController.generateToken,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

//toDo: error handling for wrong username/password combo
router.post(
  '/login',
  userController.loginUser,
  jwtController.generateToken,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

router.get(
  '/isAuth',
  jwtController.verifyToken,
  userController.findOneByUserId,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// router.get('/tools', jwtController.verifyToken, toolController.getToolsByUser, (req, res) => {
//   res.status(200).json(res.locals);
// });

/* /:id routes to get or update info for a specific user*/
router.get('/:id', (req, res) => {
  res.status(200).json(res.locals);
});

router.put('/:id',
  jwtController.verifyToken,
  userController.updateUser,
  (req, res) => {
    res.status(200).json(res.locals);
  });

router.delete('/deleteUser/:id', (req, res) => {
  res.status(200).json(res.locals);
});

// follow user by id
router.post('/follow', userController.followUser, (req, res) => {
  res.status(200).json(res.locals);
});

// unfollow user by id
router.delete('/unfollow', userController.unfollowUser, (req, res) => {
  res.status(200).json(res.locals);
});

// retrieve all users followed by a particular user
router.get('/followees', userController.getFollowees, (req, res) => {
  res.status(200).json(res.locals);
});

// retrieve all of a particular user's followers
router.get('/followers', userController.getFollowers, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = router;
