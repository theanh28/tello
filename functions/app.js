const express = require('express');
const cors = require('cors');
const routes = require('./routes/trello');

const app = express();
app.use(cors());
app.use('/', routes);

module.exports = app;
