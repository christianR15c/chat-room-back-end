const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('cross-fetch');
const cors = require('cors');
const { Server } = require('socket.io');
const model = require('../models');

// requires routes
const roomRoutes = require('./routes/room');
const userRoutes = require('./routes/user');
const assignUserRoomRoutes = require('./routes/assignUserRoom');
const loginRoutes = require('./routes/login');
const messageRoutes = require('./routes/message');

dotenv.config();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const app = express(); // setup express application
const server = http.createServer(app);
const { User } = model;
const { Message } = model;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (app.get('env') === 'development') {
  app.use(logger('dev'));
  console.log('Morgan logger is enabled...');
}

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
  res.header('Access-Control-Max-Age', '3600');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  return next();
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Welcome to the default API route',
  });
});

// function to get a room messages from the database
const getRoomMessages = async (roomId) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/messages/${roomId}`
  );
  let data = await response.json();

  return data;
};

// socket connection
io.on('connection', (socket) => {
  // listen for a new user joining the room
  socket.on('new-user', async () => {
    const members = await User.findAll();

    io.emit('new-user', members);
  });

  socket.on('join-room', async (room) => {
    socket.join(room);

    const roomMessages = await getRoomMessages(room);
    // console.log(roomMessages);
    socket.emit('room-messages', roomMessages);
  });

  socket.on(
    'message-room',
    async (message, userId, roomId, messageType, date) => {
      const newMessage = await Message.create({
        message,
        userId,
        roomId,
        messageType,
        date,
      });
      const roomMessages = await getRoomMessages(roomId);
      io.to(roomId).emit('room-messages', roomMessages);
      socket.broadcast.emit('notifications', roomId);
    }
  );
});

// use routes
app.use(roomRoutes);
app.use(userRoutes);
app.use(assignUserRoomRoutes);
app.use(loginRoutes);
app.use(messageRoutes);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
