import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    userId: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ userId }: IRequest): Promise<User[]> {
        const providers = await this.usersRepository.findAll({
            exceptUserId: userId,
        });

        return providers;
    }
}

export default ListProvidersService;
