'use strict';

const express = require('express');
// Instantiate express
/* `const app = express();` is creating an instance of the Express application. This instance will be
used to define routes, middleware, and other application settings. */
const app = express();
const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const validator = require('./middleware/validator.js');
const logger = require('./middleware/logger');




const PORT = process.env.PORT || 3002;

// Middleware
/* `app.use(logger)` is using the `logger` middleware function to log information about incoming
requests to the console. */
app.use(logger);
/* `app.use(validator);` is using the `validator` middleware function to validate the incoming request
data before it is processed by the route handler. */
app.use(validator);


// ROUTES
app.get('/', (req, res, next) => {
  res.status(200).send('Hey Everyone!');
});

app.get('/person', validator);

app.get('/bad', (req, res, next) => {
  next('Whoops! Bad route');
});


/* `app.use('*', notFound);` is a catch-all middleware that is used to handle any requests that do not
match any of the defined routes. It takes in the `notFound` function as an argument, which is a
custom error handler that sends a 404 response to the client. This ensures that the client receives
a response even if they make a request to a non-existent route. */
app.use('*', notFound);

/* `app.use(errorHandler);` is using the `errorHandler` middleware function to handle any errors that
occur during the processing of a request. This ensures that if an error occurs, the client receives
a response with an appropriate error message instead of the server crashing or hanging. */
app.use(errorHandler);


function start(){
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start};
