import userProfileRouter from '@modules/users/infra/http/routes/profile.routes';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('UpdateUserProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProvidersService = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Lennon',
            email: 'lennon@teste.com.br',
            password: '12345678',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Wayne',
            email: 'wayne@teste.com.br',
            password: '12345678',
        });

        const providers = await listProvidersService.execute({
            userId: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
