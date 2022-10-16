/* import { someError } from '../interfaces/lError'; */
/* import ErrorHandler from '../middlewares/errorHandler'; */
import { CreateMatch, MatchAnswer, Scores } from '../interfaces/lMatch';
import MatchModel from '../database/models/match';
import TeamModel from '../database/models/team';

export default class MatchService {
  constructor(
    private _matchModel: typeof MatchModel = MatchModel,
    private _teamModel: typeof TeamModel = TeamModel,
  ) {}

  public async getAllMatches(): Promise<MatchAnswer[]> {
    const result = await this._matchModel.findAll({
      include: [
        { model: this._teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: this._teamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return result as unknown as MatchAnswer[];
  }

  public async findTeam(id: number | undefined): Promise<boolean> {
    const result = await this._teamModel.findByPk(Number(id));
    return result !== null;
  }

  public async createMatch(create: CreateMatch): Promise<CreateMatch> {
    const equalName = 'It is not possible to create a match with two equal teams';
    if (create.homeTeam === create.awayTeam) {
      return { status: 401, message: equalName };
      /* throw new ErrorHandler({ status: 401, message: equalName }); */
    }
    /* const homeTeam = await this._teamModel.findOne({ where: { id: create.homeTeam } });
    const awayTeam = await this._teamModel.findOne({ where: { id: create.awayTeam } }); */
    const homeTeam = await this.findTeam(create.homeTeam);
    const awayTeam = await this.findTeam(create.awayTeam);
    if (!homeTeam || !awayTeam) {
      return { status: 404, message: 'There is no team with such id!' };
      /* throw new ErrorHandler({ status: 404, message: 'There is no team with such id!' }); */
    }
    const result = this._matchModel.create(create) as unknown as CreateMatch;
    return result;
  }

  public async changeProgress(id: number) {
    const result = await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return result;
  }

  public async changeScore(score: Scores, id: number) {
    const result = await this._matchModel.update(
      { homeTeamGoals: score.homeTeamGoals, awayTeamGoals: score.awayTeamGoals },
      { where: { id } },
    );
    return result;
  }
}
