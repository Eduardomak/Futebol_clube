/* import { RowDataPacket } from 'mysql2'; */
import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
/* import { JwtPayload } from 'jsonwebtoken'; */
import { /* auth, */ UserAnswer } from '../interfaces/lUser';
import UserModel from '../database/models/user';

export default class UserService {
  private _userModel = new UserModel();

  public async loginService(email: string, password: string):Promise<UserAnswer> {
    const result = await (this._userModel.constructor as typeof UserModel).findOne(
      { where: { email } },
    );
    if (!result) return { code: 401, message: 'Incorrect email or password' };
    const checkPassword = await compareSync(password, result.password);
    if (!checkPassword) return { code: 401, message: 'Incorrect email or password' };
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET as string);
    return { code: 200, token };
  }

  public async validToken(email: jwt.JwtPayload)/* :Promise<auth> */ {
    /* if (!token) return { code: 401, message: 'Token must be a valid token' };
    await (this._userModel.constructor as typeof UserModel);
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    const payload = data as unknown as JwtPayload;
    return payload; */
    const data = await (this._userModel.constructor as typeof UserModel).findAll({ where:
        { email } });
    return data;
  }
}
