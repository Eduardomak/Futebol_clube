import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';

export default class LeaderBoardController {
  constructor(
    private _leaderBoardService : LeaderBoardService = new LeaderBoardService(),
  ) {}

  async getHomeTeams(req: Request, res: Response, _next: NextFunction) {
    const result = await this._leaderBoardService.HomeTeams();
    return res.status(200).json(result);
  }

  async getAwayTeams(req: Request, res: Response, _next: NextFunction) {
    const result = await this._leaderBoardService.AwayTeams();
    return res.status(200).json(result);
  }

  async getAllTeams(req: Request, res: Response, _next: NextFunction) {
    const result = await this._leaderBoardService.allMatches();
    return res.status(200).json(result);
  }
}
