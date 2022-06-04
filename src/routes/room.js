const express = require('express');
const {
  createRoom,
  getAllRooms,
  updateRoom,
  getRoom,
  deleteRoom,
} = require('../controllers/room');

const router = express.Router();

router.post('/api/v1/room', createRoom);
router.get('/api/v1/room', getAllRooms);
router.get('/api/v1/room/:roomId', getRoom);
router.put('/api/v1/room/:roomId', updateRoom);
router.delete('/api/v1/room/:roomId', deleteRoom);

module.exports = router;
