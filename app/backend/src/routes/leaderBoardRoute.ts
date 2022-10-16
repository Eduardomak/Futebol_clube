import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const leaderBoardController = new LeaderBoardController();
const route = Router();

route.get('/leaderboard', leaderBoardController.getAllTeams.bind(leaderBoardController));
route.get('/leaderboard/home', leaderBoardController.getHomeTeams.bind(leaderBoardController));
route.get('/leaderboard/away', leaderBoardController.getAwayTeams.bind(leaderBoardController));

export default route;
