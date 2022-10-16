/* import { MatchAnswer } from '../interfaces/lMatch'; */
import MatchModel from '../database/models/match';
/* import MatchService from './matchService'; */
import { HomeGame, TeamsOrder, MatchHome, CompleteTeamsOrder, AwayGame } from
  '../interfaces/lLeaderBoard';
import TeamModel from '../database/models/team';

export default class LeaderBoardService {
  constructor(
    private _matchModel: typeof MatchModel = MatchModel,
    private _teamModel: typeof TeamModel = TeamModel,
  ) {}

  public async getAllGames(): Promise<MatchModel[]> {
    const result = await this._matchModel.findAll({
      where: { inProgress: false },
    });
    return result;
  }

  public async HomeTeams() {
    const result = await this._teamModel.findAll({
      attributes: {
        exclude: ['id'],
      },

      include: [
        {
          model: this._matchModel,
          as: 'matchHome',
          where: { inProgress: 0 },
        },
      ],
    }) as unknown as HomeGame[];
    /* if (!result) return { code: 404, message: 'Database Problem' }; */
    const combinedGames = await LeaderBoardService.combineHomeGames(result);
    return combinedGames;
  }

  public async AwayTeams() {
    const result = await this._teamModel.findAll({
      attributes: {
        exclude: ['id'],
      },

      include: [
        {
          model: this._matchModel,
          as: 'matchAway',
          where: { inProgress: 0 },
        },
      ],
    }) as unknown as AwayGame[];
    /* if (!result) return { code: 404, message: 'Database Problem' }; */
    const combinedGames = await LeaderBoardService.combineAwayGames(result);
    return combinedGames;
  }

  public async allMatches() {
    const home = await this.HomeTeams();
    const away = await this.AwayTeams();
    const allTeams = [...home, ...away];
    const almostAllStats = LeaderBoardService.joinStats(allTeams);
    for (let index = 0; index < almostAllStats.length; index += 1) {
      almostAllStats[index].efficiency = Number(((100 * almostAllStats[index].totalPoints)
      / (almostAllStats[index].totalGames * 3)).toFixed(2));
    }
    return LeaderBoardService.sortFunction(almostAllStats);
  }

  public static joinStats(array: CompleteTeamsOrder[]) {
    const result = [];
    for (let index = 0; index < array.length / 2; index += 1) {
      /* const objComp1 = array[index]; */
      for (let indexI = array.length / 2; indexI < array.length; indexI += 1) {
        if (array[index].name === array[indexI].name) {
          result.push({ name: array[index].name,
            totalPoints: array[index].totalPoints + array[indexI].totalPoints,
            totalGames: array[index].totalGames + array[indexI].totalGames,
            totalVictories: array[index].totalVictories + array[indexI].totalVictories,
            totalDraws: array[index].totalDraws + array[indexI].totalDraws,
            totalLosses: array[index].totalLosses + array[indexI].totalLosses,
            goalsFavor: array[index].goalsFavor + array[indexI].goalsFavor,
            goalsOwn: array[index].goalsOwn + array[indexI].goalsOwn,
            goalsBalance: array[index].goalsBalance + array[indexI].goalsBalance,
            efficiency: 2 });
        }
      }
    }
    return result;
  }

  private static async combineHomeGames(matches: HomeGame[]) {
    const getArrayObjs = matches.map((match) => {
      const objMatch = this.insideObjMatch(match.matchHome);
      const reassign = this.reassignMatch(objMatch);
      const answer = { name: match.teamName, ...reassign };
      return answer;
    });
    const result = this.sortFunction(getArrayObjs);
    return result;
  }

  private static async combineAwayGames(matches: AwayGame[]) {
    const getArrayObjs = matches.map((match) => {
      const objMatch = this.insideObjMatchAway(match.matchAway);
      const reassign = this.reassignMatch(objMatch);
      const answer = { name: match.teamName, ...reassign };
      return answer;
    });
    const result = this.sortFunction(getArrayObjs);
    return result;
  }

  private static sortFunction(matches: CompleteTeamsOrder[]) {
    return matches.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
    ));
  }

  private static insideObjMatch(array: MatchHome[]) {
    return array.map((data) => {
      let m = { g: 0, w: 0, d: 0, l: 0, p: 0, h: 0, a: 0 };
      if (data.homeTeamGoals > data.awayTeamGoals) {
        m = { ...m, w: 1, p: 3, h: data.homeTeamGoals, a: data.awayTeamGoals, g: 1 };
      } else if (data.homeTeamGoals === data.awayTeamGoals) {
        m = { ...m, d: 1, p: 1, h: data.homeTeamGoals, a: data.awayTeamGoals, g: 1 };
      } else m = { ...m, l: 1, h: data.homeTeamGoals, a: data.awayTeamGoals, g: 1 };
      return { totalPoints: m.p,
        totalGames: m.g,
        totalVictories: m.w,
        totalDraws: m.d,
        totalLosses: m.l,
        goalsFavor: m.h,
        goalsOwn: m.a,
        goalsBalance: m.h - m.a,
        efficiency: (100 * m.p) / (m.g * 3) };
    });
  }

  private static insideObjMatchAway(array: MatchHome[]) {
    return array.map((data) => {
      let m = { g: 0, w: 0, d: 0, l: 0, p: 0, h: 0, a: 0 };
      if (data.homeTeamGoals < data.awayTeamGoals) {
        m = { ...m, w: 1, p: 3, h: data.homeTeamGoals, a: data.awayTeamGoals, g: 1 };
      } else if (data.homeTeamGoals === data.awayTeamGoals) {
        m = { ...m, d: 1, p: 1, h: data.homeTeamGoals, a: data.awayTeamGoals, g: 1 };
      } else m = { ...m, l: 1, h: data.homeTeamGoals, a: data.awayTeamGoals, g: 1 };
      return { totalPoints: m.p,
        totalGames: m.g,
        totalVictories: m.w,
        totalDraws: m.d,
        totalLosses: m.l,
        goalsFavor: m.a,
        goalsOwn: m.h,
        goalsBalance: m.a - m.h,
        efficiency: (100 * m.p) / (m.g * 3) };
    });
  }

  private static reassignMatch(array: TeamsOrder[]) {
    let [c, d, e, f, g, sum] = [0, 0, 0, 0, 0, 0];
    for (let index = 0; index < array.length; index += 1) {
      c += array[index].totalVictories;
      d += array[index].totalDraws;
      e += array[index].totalLosses;
      f += array[index].goalsFavor;
      g += array[index].goalsOwn;
      sum += array[index].efficiency;
    }
    return { totalPoints: c * 3 + d,
      totalGames: c + d + e,
      totalVictories: c,
      totalDraws: d,
      totalLosses: e,
      goalsFavor: f,
      goalsOwn: g,
      goalsBalance: f - g,
      efficiency: Number((sum / (c + d + e)).toFixed(2)) };
  }
}
