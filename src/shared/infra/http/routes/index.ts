import { Router } from 'express';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import userProfileRoutes from '@modules/users/infra/http/routes/profile.routes';
import appointmentRouter from '../../../../modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '../../../../modules/appointments/infra/http/routes/providers.routes';
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
routes.use('/password', passwordRouter);
routes.use('/profile', userProfileRoutes);
routes.use('/providers', providersRouter);

export default routes;
