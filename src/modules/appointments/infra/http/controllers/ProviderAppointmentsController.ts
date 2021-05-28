import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const providerId = request.user.id;

        const { year, month, day } = request.query;

        const listProviderAppointmentsService: ListProviderAppointmentsService = container.resolve(
            ListProviderAppointmentsService,
        );
        const appointments = await listProviderAppointmentsService.execute({
            providerId,
            year: Number(year),
            month: Number(month),
            day: Number(day),
        });

        return response.json(appointments);
    }
}
