import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userId = request.user.id;

        const listProvidersService: ListProvidersService = container.resolve(
            ListProvidersService,
        );
        const providers = await listProvidersService.execute({
            userId,
        });

        return response.json(classToClass(providers));
    }
}
