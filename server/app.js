const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const api = require('./api');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);
app.use(express.static(path.join(__dirname, '..', 'client', 'houses-app', 'build')));
app.use('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'houses-app', 'index.html'))
);

module.exports = app;
