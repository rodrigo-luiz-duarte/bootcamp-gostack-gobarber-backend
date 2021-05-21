import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    userId: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        userId,
        name,
        email,
        oldPassword,
        password,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found.');
        }

        const userWithEmail = await this.usersRepository.findByEmail(email);

        if (userWithEmail && userWithEmail.id !== userId) {
            throw new AppError('E-mail already in use by another user.');
        }

        user.name = name;
        user.email = email;

        if (password && !oldPassword) {
            throw new AppError(
                'The old password is required to update the password.',
            );
        }

        if (password && oldPassword) {
            const checkOldPassword = await this.hashProvider.compareHash(
                oldPassword,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('The old password is wrong.');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateUserAvatarService;
