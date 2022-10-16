import { Router } from 'express';
import login from './loginRoute';
import leaderB from './leaderBoardRoute';
import teamRoute from './teamRoute';
import match from './matchRoute';

const rootRouter = Router();

rootRouter.use(login);
rootRouter.use(leaderB);
rootRouter.use(teamRoute);
rootRouter.use(match);

export default rootRouter;
