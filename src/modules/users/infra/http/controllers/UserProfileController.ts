import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';
import { classToClass } from 'class-transformer';

export default class UserProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;

        const showUserProfileService = container.resolve(
            ShowUserProfileService,
        );

        const user = await showUserProfileService.execute({ userId });

        return response.json(classToClass(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userId = request.user.id;

        const { name, email, oldPassword, password } = request.body;

        const updateUserProfileService = container.resolve(
            UpdateUserProfileService,
        );

        const user = await updateUserProfileService.execute({
            userId,
            name,
            email,
            oldPassword,
            password,
        });

        return response.json(classToClass(user));
    }
}
