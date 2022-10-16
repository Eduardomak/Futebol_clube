import { someError } from '../interfaces/lError';

export default class errorHandler extends Error {
  public status: number;
  public message: string;
  constructor({ status, message }: someError /* status: number, message: string */) {
    super(message);
    this.status = status;
    this.message = message;
  }

  /* get message(): string {
    return this._errorHandler.message;
  }

  get status(): number {
    return this._errorHandler.status;
  } */
  /* async function errmess(req, res, next) */
}
