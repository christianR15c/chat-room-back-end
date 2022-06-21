const model = require('../../models');

const { Room } = model;

const createRoom = (req, res) => {
  const { room_name, createdBy } = req.body;

  Room.findOne({
    where: { room_name },
  })
    .then((exist) => {
      if (exist)
        res
          .status(400)
          .json({ error: `${exist.room_name} room already exist` });
      else {
        Room.create({
          room_name,
          createdBy,
        }).then((room) =>
          res.status(201).json({
            message: `${room.room_name} room has created succssfully`,
            room,
          })
        );
      }
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
    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No Rooms created yet' });
    }
    res.status(200).json(rooms);
  });
};

const getRoom = (req, res) => {
  const { roomId } = req.params;
  Room.findByPk(roomId).then((room) => {
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  });
};

const deleteRoom = (req, res) => {
  const { roomId } = req.params;
  Room.findByPk(roomId).then((room) => {
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    room
      .destroy()
      .then(() => res.status(200).json({ message: 'Room deleted' }));
  });
};

module.exports = { createRoom, updateRoom, getAllRooms, getRoom, deleteRoom };
