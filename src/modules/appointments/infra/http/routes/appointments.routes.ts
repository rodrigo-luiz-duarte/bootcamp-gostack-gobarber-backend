import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//     const appointments = await appointmentRepository.find();

//     return response.json(appointments);
// });

appointmentRouter.post('/', async (request, response) => {
    const { providerId, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService: CreateAppointmentService = container.resolve(
        CreateAppointmentService,
    );
    const appointment = await createAppointmentService.execute({
        providerId,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentRouter;
