import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointmet', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();

        fakeNotificationsRepository = new FakeNotificationsRepository();

        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository,
            fakeNotificationsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 23, 8).getTime();
        });

        const appointment = await createAppointmentService.execute({
            providerId: '12343545',
            userId: '98765432',
            date: new Date(2021, 4, 24, 13),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('12343545');
    });

    it('should not be able to create two appointments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 24, 8).getTime();
        });

        const appointmentDate = new Date(2021, 4, 28, 13);

        await createAppointmentService.execute({
            providerId: '12343545',
            userId: '98765432',
            date: appointmentDate,
        });

        await expect(
            createAppointmentService.execute({
                providerId: '12343545',
                userId: '98765432',
                date: appointmentDate,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create appointments on the past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 23, 8).getTime();
        });

        await expect(
            createAppointmentService.execute({
                providerId: '12343545',
                userId: '98765432',
                date: new Date(2021, 4, 22, 12),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create appointments with same user and provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 23, 8).getTime();
        });

        await expect(
            createAppointmentService.execute({
                providerId: '12343545',
                userId: '12343545',
                date: new Date(2021, 4, 23, 12),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create appointments before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 23, 8).getTime();
        });

        await expect(
            createAppointmentService.execute({
                providerId: 'provider-id',
                userId: 'user-id',
                date: new Date(2021, 4, 24, 7),
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointmentService.execute({
                providerId: 'provider-id',
                userId: 'user-id',
                date: new Date(2021, 4, 23, 18),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
