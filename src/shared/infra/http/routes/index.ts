import { Router } from 'express';
import appointmentRouter from '../../../../modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';

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
