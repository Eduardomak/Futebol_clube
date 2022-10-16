import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
//import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { request, expect } = chai;

const postLogin = { 
  "email": "admin@admin.com",
  "password": "secret_admin"
}

const fakeLogin1 = { 
  "email": "wrong_email",
  "password": "secret_admin"
}

const fakeLogin2 = { 
  "email": "admin@admin.com",
  "password": "wrong_password"
}

const incompleteLogin = {
  "email": "",
  "password": "wrong_password"
}

describe('User Login test', () => {
  describe('Testing route /login of the method Post', () => {

    it('returns status 200 and token', async () => {
     const result = await request(app).post('/login').send(postLogin);
     expect(result).to.have.status(200);
     expect(result.body).to.have.key("token")
   });

   it('returns status 401 and error message', async () => {
    const result1 = await request(app).post('/login').send(fakeLogin1);
    const result2 = await request(app).post('/login').send(fakeLogin2);
    expect(result1).to.have.status(401);
    expect(result1.body).to.have.haveOwnProperty("message", "Incorrect email or password")
    expect(result2).to.have.status(401);
    expect(result2.body).to.have.haveOwnProperty("message", "Incorrect email or password")
  });

  it('returns status 400 bad request and error message', async () => {
    const result = await request(app).post('/login').send(incompleteLogin);
    expect(result).to.have.status(400);
    expect(result.body).to.have.haveOwnProperty("message", "All fields must be filled")
  });

  it('returns status 400 bad request and error message', async () => {
    const result = await request(app).post('/login').send(incompleteLogin);
    expect(result).to.have.status(400);
    expect(result.body).to.have.haveOwnProperty("message", "All fields must be filled")
  });
  });
});
