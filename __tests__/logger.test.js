'use strict';

const { describe, it } = require('eslint/lib/rule-tester/rule-tester');
const logger = require('../middleware/logger');

describe('From the Logger Middleware', () => {
  
  // can use same variables for multiple tests
  let consoleSpy;
  const req = {};
  const res = {};
  const next = jest.fn();

  beforeEach(() => {
    // This will attach to the console (spy on it an take it over)
    consoleSpy = jest.spyOn(console, 'log').nmockImplementation(); 
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('Properly logs output', () => {
    logger(req, res, next);
    console.log('req',req);
    expect(consoleSpy).toHaveBeenCalledWith(`REQUEST: ${req.method}, ${req.originalUrl}`);
  });

  it('Works as expected', () => {
    logger(req,res, next);
    //check over the calledwith parameter to see what you're returning
    /* `expect(next).toHaveBeenCalledWith();` is checking if the `next` function was called with no
    arguments. It is used to test if the middleware function `logger` properly calls the `next`
    function to move on to the next middleware or route handler. */
    expect(next).toHaveBeenCalledWith();
  });
}); 
