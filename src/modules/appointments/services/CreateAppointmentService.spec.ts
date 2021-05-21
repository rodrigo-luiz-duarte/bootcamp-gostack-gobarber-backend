import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointmet', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointmentService.execute({
            providerId: '12343545',
            date: new Date(),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('12343545');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date();

        await createAppointmentService.execute({
            providerId: '12343545',
            date: appointmentDate,
        });

        expect(
            createAppointmentService.execute({
                providerId: '12343545',
                date: appointmentDate,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
