const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('../middleware/logger');
const authenticate = require('../middleware/authenticate-middleware');
const authRouter = require('../auth/auth-router');
const parentsRouter = require('../parents/parents-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/api/auth', authRouter);
server.use('/api/parents', authenticate, parentsRouter);

module.exports = server;
