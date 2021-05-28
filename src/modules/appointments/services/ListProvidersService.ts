import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    userId: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ userId }: IRequest): Promise<User[]> {
        const cacheKey = `providers-list:${userId}`;

        let providers = await this.cacheProvider.getValue<User[]>(cacheKey);

        if (!providers) {
            providers = await this.usersRepository.findAll({
                exceptUserId: userId,
            });

            await this.cacheProvider.save<User[]>(
                cacheKey,
                classToClass(providers),
            );
        }

        return providers;
    }
}

export default ListProvidersService;
