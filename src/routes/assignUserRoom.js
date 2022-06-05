const express = require('express');
const {
  assignUserToRoom,
  removeUserToRoom,
  usersInRoom,
  userInRoom,
} = require('../controllers/assignUserToRoom');

const router = express.Router();

router.post('/api/v1/user/:userId/room/:roomId', assignUserToRoom);
router.delete('/api/v1/user/:userId/room/:roomId', removeUserToRoom);
router.get('/api/v1/users/room/:roomId', usersInRoom);
router.get('/api/v1/users/room/:roomId/:userId', userInRoom);

module.exports = router;
