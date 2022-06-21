const model = require('../../models');

// import sequelize
const { sequelize } = require('../../models');

const { Message } = model;
const { User } = model;

const createMessage = (req, res) => {
  const { message, messageType } = req.body;
  const userId = req.user.id;
  const roomId = req.params.roomId;
  const date = new Date().toISOString().slice(0, 10);
  Message.create({
    message,
    messageType,
    userId,
    roomId,
    date,
  })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

// get messages from a specific room by roomId ordered from newest to oldest
const getMessages = (req, res) => {
  const roomId = req.params.roomId;
  Message.findAll({
    where: { roomId },
    order: [['createdAt', 'ASC']],
    // include user
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
        as: 'user',
      },
    ],
    // include: [{ model: User, as: 'user' }],
  })
    .then((messages) => {
      if (messages.length === 0) {
        res.status(400).json({
          error: 'No messages found',
        });
      } else {
        res.status(200).json(messages);
      }
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

// group messages by date
const getMessagesByDate = (req, res) => {
  const roomId = req.params.roomId;
  Message.findAll({
    where: { roomId },
    attributes: ['date'],
    group: ['date'],
    order: [['date', 'ASC']],
    // include user
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
        as: 'user',
      },
    ],
  })
    .then((messages) => {
      if (messages.length === 0) {
        res.status(400).json({
          error: 'No messages found',
        });
      } else {
        res.status(200).json(messages);
      }
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

module.exports = {
  createMessage,
  getMessages,
  getMessagesByDate,
};
