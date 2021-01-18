const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const usersRouter = require('./users/user-router');
const authRouter = require('./auth/auth-router');
const postsRouter = require('./posts/post-router');
const likesRouter = require('./likes/like-router');

server.use(helmet());
server.use(cors({ origin: '*' }));
server.use(express.json());

server.use('/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);
server.use('/api/likes', likesRouter);

server.get('/', (_, res) => {
	res.json({ api: 'api running' });
});

module.exports = server;
