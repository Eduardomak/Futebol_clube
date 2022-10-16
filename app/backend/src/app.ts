import * as express from 'express';
/* import TeamController from './controllers/teamController'; */
/* import UserController from './controllers/userController'; */
/* import MatchController from './controllers/matchController'; */
/* import validLogin from './middlewares/validations/login'; */
/* import ValidToken from './middlewares/validateToken'; */
/* import login from './routes/loginRoute';
import leaderB from './routes/leaderBoardRoute';
import teamRoute from './routes/teamRoute';
import match from './routes/matchRoute'; */
import routes from './routes/index';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use(routes);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
