import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const { year, month } = request.body;

        const listProviderMonthAvailabilityService = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const availability = await listProviderMonthAvailabilityService.execute(
            {
                providerId: id,
                year,
                month,
            },
        );

        return response.json(availability);
    }
}
