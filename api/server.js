const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('../middleware/logger');
//const authenticate = require('../middleware/authenticate-middleware');
const authRouter = require('../auth/auth-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/api/auth', authRouter);

module.exports = server;
