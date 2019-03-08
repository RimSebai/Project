const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');
const api = require('./api');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api.apiRouter);
// app.use(express.static(path.join(__dirname, '..', 'client', 'houses-app')));
app.use('*', (req, res) => res.send('hello world'));
// res.sendFile(path.join(__dirname, '..', 'client', 'houses-app', 'index.html'))
// );

module.exports = app;
