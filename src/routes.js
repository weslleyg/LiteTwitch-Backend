const express = require('express');

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const StreamController = require('./controllers/StreamController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/register', UserController.register);
routes.post('/login', AuthController.login);
routes.post('/stream', authMiddleware, StreamController.streamer);
routes.get('/stream', authMiddleware, StreamController.streams);
routes.get('/stream/:id', authMiddleware, StreamController.show);
routes.delete('/stream/:id', authMiddleware, StreamController.del);

module.exports = routes;
