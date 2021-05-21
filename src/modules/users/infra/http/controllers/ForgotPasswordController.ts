import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordMailService from '../../../services/SendForgotPasswordMailService';

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordMailService = container.resolve(
            SendForgotPasswordMailService,
        );

        await sendForgotPasswordMailService.execute({
            email,
        });

        return response.status(204).json();
    }
}
