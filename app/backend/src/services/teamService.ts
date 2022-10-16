import { TeamAnswer } from '../interfaces/lTeam';
import TeamModel from '../database/models/team';

export default class teamService {
  /* constructor(private teams: typeof teamModel) {} */
  private _TeamModel;

  constructor() {
    this._TeamModel = TeamModel;
  }

  /* public async getAllService():Promise<TeamAnswer[]> {
    const result = await this.teams.findAll();
    return result;
  } */

  async getAllService(): Promise<TeamAnswer[]> {
    const teams = await this._TeamModel.findAll() as TeamAnswer[];
    return teams;
  }

  async getOneService(id: number): Promise<TeamAnswer | null> {
    const team = await this._TeamModel.findByPk(id) as TeamAnswer;
    return team;
  }
}
