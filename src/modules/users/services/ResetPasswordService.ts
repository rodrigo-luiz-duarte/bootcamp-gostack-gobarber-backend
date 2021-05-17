import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token not found.');
        }

        const user = await this.usersRepository.findById(userToken.userId);

        if (!user) {
            throw new AppError('User not found.');
        }

        const timeOffset = differenceInHours(Date.now(), userToken.createdAt);

        if (Math.abs(timeOffset) > 2) {
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
