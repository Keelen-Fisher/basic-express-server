// Performs a console.log with the request method and path
// Import this into your server and set it up to run at the application level for all routes

'use strict';

module.exports = function (req, res, next) {
  console.log(`Logging request with logger middleware: ${req.method}, ${req.originalUrl}`);
  next();

};