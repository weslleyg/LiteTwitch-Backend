const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('INSIRA SUA URL', {
	useNewUrlParser: true,
	useCreateIndex: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(require('./routes'));

app.listen(3333);
