import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate a user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUsersService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUsersService.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        const response = await authenticateUserService.execute({
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        expect(response).toHaveProperty('token');
        expect(response.user.getUserWithoutPassword()).toEqual(user);
    });

    it('should not be able to authenticate a non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await expect(
            authenticateUserService.execute({
                email: 'johndoe@teste.com.br',
                password: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate a user with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUsersService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUsersService.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        await expect(
            authenticateUserService.execute({
                email: 'johndoe@teste.com.br',
                password: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
