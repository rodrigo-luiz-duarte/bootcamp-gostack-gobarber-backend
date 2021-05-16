import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordMailService from './SendForgotPasswordMailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordMailService: SendForgotPasswordMailService;

describe('SendForgotPasswordMail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordMailService = new SendForgotPasswordMailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recover the password using e-mail address', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        const user = await sendForgotPasswordMailService.execute({
            email: 'johndoe@teste.com.br',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to recover a non-existing user password', async () => {
        await expect(
            sendForgotPasswordMailService.execute({
                email: 'johndoe@teste.com.br',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@teste.com.br',
            password: '12345678',
        });

        await sendForgotPasswordMailService.execute({
            email: 'johndoe@teste.com.br',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
