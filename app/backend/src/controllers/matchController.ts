import { NextFunction, Request, Response } from 'express';
/* import errorHandler from '../middlewares/errorHandler'; */
import MatchService from '../services/matchService';
import UserService from '../services/userService';

export default class MatchController {
  constructor(
    private _matchService : MatchService = new MatchService(),
    private _userService : UserService = new UserService(),
  ) {}

  async getAllCon(req: Request, res: Response) {
    const result = await this._matchService.getAllMatches();
    return res.status(200).json(result);
  }

  async createCon(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('entrou no try?');
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const result = await this._matchService.createMatch(
        { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals },
      );
      if (result.message) {
        return res.status(Number(result.status)).json({
          message: result.message });
      }
      return res.status(201).json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async changeProgress(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    await this._matchService.changeProgress(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async changeScore(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._matchService.changeScore({ homeTeamGoals, awayTeamGoals }, Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}
