import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmet', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();

        const createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointmentService.execute({
            providerId: '12343545',
            date: new Date(),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('12343545');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();

        const createAppointmentService = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

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
