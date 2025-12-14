import { IRouter, Router } from 'express';
import userRouter from '../modules/user/user.route';

type TModuleRoutes = { path: string; router: IRouter }[];
const router = Router();
const moduleRoutes: TModuleRoutes = [
  {
    path: '/users',
    router: userRouter,
  },
];

const routes = moduleRoutes.map((route) =>
  router.use(route.path, route.router),
);

export default routes;
