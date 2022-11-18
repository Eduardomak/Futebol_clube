import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import * as status from 'http-status';
import UserService from '../services/userService';

export default class UserController {
  private _userService = new UserService();

  async loginCon(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this._userService.loginService(email, password);
      /* console.log(result); */
      if (result.message) return res.status(result.code).json({ message: result.message });
      return res.status(result.code).json({ token: result.token });
    } catch (error) {
      return error;
    }
  }

  async auth(req: Request, res: Response) {
    const data = req.body.user.email as JwtPayload;
    console.log(data);
    const result = await this._userService.validToken(data);
    return res.status(status.OK).json({ role: result[0].role });
    /*       res.status(401).json({ message: 'wrong mistake' }); */
  }
}
