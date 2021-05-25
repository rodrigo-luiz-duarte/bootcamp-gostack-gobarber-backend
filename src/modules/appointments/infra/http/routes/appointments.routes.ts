import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//     const appointments = await appointmentRepository.find();

//     return response.json(appointments);
// });

appointmentRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            providerId: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);
appointmentRouter.get('/me', providerAppointmentsController.index);

export default appointmentRouter;
