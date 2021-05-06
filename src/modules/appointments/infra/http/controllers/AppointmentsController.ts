import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
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
    }
}
