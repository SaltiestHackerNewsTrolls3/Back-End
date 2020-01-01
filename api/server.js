const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../middleware/authenticate-middleware.js');
const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter');
const commentsRouter = require('../favComments/comments-router.js');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/comments', authenticate, commentsRouter);

server.get('/', (req, res) => {
  res.send('The Server is Working!');
});

module.exports = server;