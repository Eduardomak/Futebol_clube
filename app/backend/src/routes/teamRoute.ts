import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teamController = new TeamController();
const route = Router();

route.get('/teams', teamController.getAllCon.bind(teamController));
route.get('/teams/:id', teamController.getOneCon.bind(teamController));

export default route;
