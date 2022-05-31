const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');

dotenv.config();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const app = express(); // setup express application
const server = http.createServer(app);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (app.get('env') === 'development') {
  app.use(logger('dev'));
  console.log('Morgan logger is enabled...');
}

app.use(function (req, res, next) {
  origin = req.headers.origin;
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
    methods: ['GET', 'POST'],
  },
});

app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the default API route',
  })
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
