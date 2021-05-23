import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfileService: ShowUserProfileService;

describe('UpdateUserProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showUserProfileService = new ShowUserProfileService(
            fakeUsersRepository,
        );
    });

    it('should be able to show a user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        const updatedUser = await showUserProfileService.execute({
            userId: user.id,
        });

        expect(updatedUser.name).toBe('John Doe');
        expect(updatedUser.email).toBe('johndoe@teste.com.br');
    });

    it('should not be able to show a non-existing user profile', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        await expect(
            showUserProfileService.execute({
                userId: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
