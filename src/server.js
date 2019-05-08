const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.origins(['*']);

io.on('connection', (socket) => {
	socket.on('connectRoom', (stream) => {
		socket.join(stream);
	});
});

mongoose.connect('mongodb+srv://weslley:q1w2e3r4t5@teste-pfeej.mongodb.net/test?retryWrites=true', {
	useNewUrlParser: true,
	useCreateIndex: true
});

app.use((req, res, next) => {
	req.io = io;

	return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(require('./routes'));

app.listen(3333);
