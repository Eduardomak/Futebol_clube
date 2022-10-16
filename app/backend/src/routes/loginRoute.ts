import { Router } from 'express';
import validLogin from '../middlewares/validations/login';
import UserController from '../controllers/userController';
import ValidToken from '../middlewares/validateToken';

const userController = new UserController();
const route = Router();

/* this.app.post('/login', validLogin, userController.loginCon.bind(userController));
this.app.get('/login/validate', ValidToken, userController.auth.bind(userController)); */

route.post('/login', validLogin, userController.loginCon.bind(userController));
route.get('/login/validate', ValidToken, userController.auth.bind(userController));

export default route;
