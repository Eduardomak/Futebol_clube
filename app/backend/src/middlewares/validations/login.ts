/* const joi = require('joi'); */
import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const schemaLogin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export default function validLogin(req: Request, res: Response, next: NextFunction) {
  const { error } = schemaLogin.validate(req.body);
  /* if (error && error.details[0].type === 'string.email') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  } */
  if (error && error.details[0].type === 'string.empty') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
}

/* module.exports = validBody; */
