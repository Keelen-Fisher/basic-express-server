'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);

describe('Validating the query function', () => {

  it('404 on a bad route', async () => {
    const response = await request.get('/lost');
    expect(response.body.message).toEqual('Not Found');
    expect(response.body.error).toEqual(404);
  });


  it('500 if no name in the query string', async () => {
    let response = await request.get('/person?name=');
    expect(response.body.error).toEqual(500);
  });


  it('200 if the name is in the query string', async () => {
    let response = await request.get('/person?name=Keelen');
    expect(response.status).toEqual(200);
  });


  it('given an name in the query string, the output object is correct', async() => {
    const response = await request.get('/person?name=Keelen');
    expect(response.body).toHaveProperty('name');
  });

});