import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        fakeHashProvider = new FakeHashProvider();

        updateUserProfileService = new UpdateUserProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update a user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        const updatedUser = await updateUserProfileService.execute({
            userId: user.id,
            name: 'Jonh Lennon',
            email: 'lennon@teste.com.br',
        });

        expect(updatedUser.name).toBe('Jonh Lennon');
        expect(updatedUser.email).toBe('lennon@teste.com.br');
    });

    it('should not be able to update a user email within a email address in use', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        const otherUser = await fakeUsersRepository.create({
            name: 'John Lennon',
            email: 'lennon@teste.com.br',
            password: '12345678',
        });

        await expect(
            updateUserProfileService.execute({
                userId: otherUser.id,
                name: 'John Lennon',
                email: 'johndoe@teste.com.br',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        const updatedUser = await updateUserProfileService.execute({
            userId: user.id,
            name: 'Jonh Lennon',
            email: 'lennon@teste.com.br',
            oldPassword: '12345678',
            password: '12341234',
        });

        expect(updatedUser.password).toBe('12341234');
    });

    it('should not be able to update the password without the old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        await expect(
            updateUserProfileService.execute({
                userId: user.id,
                name: 'Jonh Lennon',
                email: 'lennon@teste.com.br',
                password: '12341234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong the old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        await expect(
            updateUserProfileService.execute({
                userId: user.id,
                name: 'Jonh Lennon',
                email: 'lennon@teste.com.br',
                oldPassword: '87654321',
                password: '12341234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a non-existing user profile', async () => {
        await expect(
            updateUserProfileService.execute({
                userId: 'non-existing-user-id',
                name: 'Jonh Lennon',
                email: 'lennon@teste.com.br',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
