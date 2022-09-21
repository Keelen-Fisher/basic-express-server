'use strict';

const express = require('express');
const app = express();
const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const validator = require('./middleware/validator.js');
const logger = require('./middleware/logger');


require('dotenv').config();

const PORT = process.env.PORT || 3002;

app.use(logger);


// app.use(validator);

app.get('/', (req, res, next) => {
  res.status(200).send('Hey Everyone!');
});

app.get('/bad', (req, res, next) => {
  next('Whoops! Bad route');
});

app.get('/person', validator);

app.use('*', notFound);


app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start};