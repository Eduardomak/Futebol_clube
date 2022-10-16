import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
/* import { JwtPayload } from 'jsonwebtoken'; */

export default function ValidToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'valid token needed' });
  try {
    const data = jwt.verify(authorization, process.env.JWT_SECRET as string);
    req.body.user = data as unknown;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
