import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const fakeHashProvider = new FakeHashProvider();

        const createUsersService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUsersService.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create two users with the same e-mail address', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const fakeHashProvider = new FakeHashProvider();

        const createUsersService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUsersService.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        expect(
            createUsersService.execute({
                name: 'John Doe 2',
                email: 'johndoe@teste.com.br',
                password: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
