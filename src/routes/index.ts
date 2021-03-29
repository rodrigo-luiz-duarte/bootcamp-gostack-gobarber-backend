import { Router } from 'express';
import appointmentRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

/**
 * Quando utilizado da forma abaixo, todas as requisições que chegarem para URL's
 * /appointment/*, serão repassadas para appointmentRouter e o recurso /appointments
 * pode ser omitido no appointmentRouter
 *
 */
routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
