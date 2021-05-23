import { inject, injectable } from 'tsyringe';
import User, { UserWithoutPassword } from '../infra/typeorm/entities/User';

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    userId: string;
}

@injectable()
class ShowUserProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ userId }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found.');
        }

        return user;
    }
}

export default ShowUserProfileService;
