import { TeamAnswer } from '../interfaces/lTeam';
import TeamModel from '../database/models/team';

export default class TeamService {
  /* constructor(private teams: typeof teamModel) {} */
  /* private _TeamModel;

  constructor() {
    this._TeamModel = TeamModel;
  } */
  constructor(
    private _teamModel: typeof TeamModel = TeamModel,
  ) {}

  /* public async getAllService():Promise<TeamAnswer[]> {
    const result = await this.teams.findAll();
    return result;
  } */

  async getAllService(): Promise<TeamAnswer[]> {
    const teams = await this._teamModel.findAll() as TeamAnswer[];
    return teams;
  }

  async getOneService(id: number): Promise<TeamAnswer | null> {
    const team = await this._teamModel.findByPk(id) as TeamAnswer;
    return team;
  }
}
