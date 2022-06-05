const model = require('../../models');

const { User, Room, userRoom } = model;

const assignUserToRoom = (req, res) => {
  const userId = req.params.userId;
  const roomId = req.params.roomId;

  userRoom
    .findOne({
      where: {
        userId,
        roomId,
      },
    })
    .then((userroom) => {
      if (userroom) {
        return res
          .status(400)
          .json({ message: 'User already assigned to room' });
      }
      userRoom
        .create({
          userId,
          roomId,
        })
        .then((userRoom) => {
          res.status(200).json({
            message: 'User assigned to room successfully',
            userRoom: {
              id: userRoom.id,
              userId: userRoom.userId,
              roomId: userRoom.roomId,
            },
          });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

const removeUserToRoom = (req, res) => {
  const userId = req.params.userId;
  const roomId = req.params.roomId;
  userRoom
    .findOne({
      where: {
        userId,
        roomId,
      },
    })
    .then((userroom) => {
      if (!userroom) {
        return res.status(400).json({ message: 'User not assigned to room' });
      }
      userroom.destroy().then(() => {
        res
          .status(200)
          .json({ message: 'User removed from room successfully' });
      });
    });
};

const usersInRoom = (req, res) => {
  const roomId = req.params.roomId;
  const userId = req.params.userId;
  Room.findAll({
    where: {
      id: roomId,
    },
    include: {
      model: User,
      as: 'users',
      attributes: ['name', 'email'],
      through: {
        attributes: ['userId'],
      },
    },
  }).then((usersroom) => {
    if (!usersroom) {
      return res.status(400).json({ message: 'no one in room' });
    }
    res.status(200).json(usersroom.map((users) => users));
  });
};

const userInRoom = (req, res) => {
  const roomId = req.params.roomId;
  const userId = req.params.userId;
  Room.findOne({
    where: {
      id: roomId,
    },
    include: {
      model: User,
      as: 'users',
      where: {
        id: userId,
      },
      attributes: ['name', 'email'],
      through: {
        attributes: ['userId'],
      },
    },
  }).then((userroom) => {
    if (!userroom) {
      return res.status(400).json({ message: 'no one in room' });
    }
    res.status(200).json(userroom);
  });
};

module.exports = {
  assignUserToRoom,
  removeUserToRoom,
  usersInRoom,
  userInRoom,
};
