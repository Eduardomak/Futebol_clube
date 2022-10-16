import { Router } from 'express';
import ValidToken from '../middlewares/validateToken';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();

const route = Router();

route.get('/matches', matchController.getAllCon.bind(matchController));
route.post('/matches', ValidToken, matchController.createCon.bind(matchController));
route.patch('/matches/:id', matchController.changeScore.bind(matchController));
route.patch('/matches/:id/finish', matchController.changeProgress.bind(matchController));

export default route;
