import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../../users/services/CreateAppointmentService';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
    const { providerId, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService: CreateAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({
        providerId,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentRouter;
