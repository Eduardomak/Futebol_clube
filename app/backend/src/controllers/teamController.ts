import { Request, Response } from 'express';
import * as status from 'http-status';
import TeamService from '../services/teamService';

export default class TeamController {
  constructor(
    private _teamService : TeamService = new TeamService(),
  ) {}

  async getAllCon(_req: Request, res: Response) {
    const result = await this._teamService.getAllService();
    return res.status(status.OK).json(result);
  }

  async getOneCon(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._teamService.getOneService(Number(id));
    return res.status(status.OK).json(result);
  }
}
