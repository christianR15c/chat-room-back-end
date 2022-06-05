const model = require('../../models');

const { Room } = model;

const createRoom = (req, res) => {
  const { room_name } = req.body;
  Room.findOrCreate({
    where: { room_name },
  })
    .then(([room, created]) => {
      created
        ? res.status(200).json({
            message: `${room.room_name} room has created succssfully`,
          })
        : res
            .status(400)
            .json({ message: `${room.room_name} room already exist` });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

const updateRoom = (req, res) => {
  const { room_name } = req.body;
  const { roomId } = req.params;

  Room.findByPk(roomId).then((room) => {
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    room
      .update({ room_name })
      .then(() => res.status(200).json({ message: 'Room updated' }))
      .catch((error) => res.status(400).json({ error: error.message }));
  });
};

const getAllRooms = (req, res) => {
  Room.findAll().then((rooms) => {
    res.status(200).json(rooms);
  });
};

const getRoom = (req, res) => {
  const { roomId } = req.params;
  Room.findByPk(roomId).then((room) => {
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  });
};

const deleteRoom = (req, res) => {
  const { roomId } = req.params;
  Room.findByPk(roomId).then((room) => {
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    room
      .destroy()
      .then(() => res.status(200).json({ message: 'Room deleted' }));
  });
};

module.exports = { createRoom, updateRoom, getAllRooms, getRoom, deleteRoom };
