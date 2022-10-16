import { Router } from 'express';
import TeamController from '../controllers/teamController';

const route = Router();

route.get('/teams', TeamController.getAllCon.bind(TeamController));
route.get('/teams/:id', TeamController.getOneCon.bind(TeamController));

export default route;
