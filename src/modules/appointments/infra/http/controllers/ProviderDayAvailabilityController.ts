import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const { year, month, day } = request.body;

        const listProviderDayAvailabilityService: ListProviderDayAvailabilityService = container.resolve(
            ListProviderDayAvailabilityService,
        );

        const availability = await listProviderDayAvailabilityService.execute({
            providerId: id,
            year,
            month,
            day,
        });

        return response.json(availability);
    }
}
