import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const { year, month, day } = request.query;

        const listProviderDayAvailabilityService: ListProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const availability = await listProviderDayAvailabilityService.execute({
            providerId: id,
            year: Number(year),
            month: Number(month),
            day: Number(day),
        });

        return response.json(availability);
    }
}
