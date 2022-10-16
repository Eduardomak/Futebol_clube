import { Request, Response } from 'express';
import TeamService from '../services/teamService';

const TeamController = {
  /* constructor(private teams: typeof teamService) {} */

  async getAllCon(_req: Request, res: Response) {
    const _teamService = new TeamService();
    const result = await _teamService.getAllService();
    return res.status(200).json(result);
  },

  async getOneCon(req: Request, res: Response) {
    const _teamService = new TeamService();
    const { id } = req.params;
    const result = await _teamService.getOneService(Number(id));
    return res.status(200).json(result);
  },
};

export default TeamController;
