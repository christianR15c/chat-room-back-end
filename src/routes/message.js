const express = require('express');
const {
  createMessage,
  getMessages,
  getMessagesByDate,
} = require('../controllers/message');
const router = express.Router();

router.post('/api/v1/message/:roomId', createMessage);
router.get('/api/v1/messages/:roomId', getMessages);
router.get('/api/v1/messagesByDate/:roomId/', getMessagesByDate);

module.exports = router;
