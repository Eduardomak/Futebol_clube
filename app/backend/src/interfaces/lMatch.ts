export interface CreateMatch {
  homeTeam?: number,
  awayTeam?: number,
  homeTeamGoals?: number,
  awayTeamGoals?: number,
  status?: number,
  message?: string
}

export interface MatchAnswer {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  }
  teamAway: {
    teamName: string
  }
}

export interface Scores {
  homeTeamGoals: number,
  awayTeamGoals: number,
}
