import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    providerId: string;
    userId: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        providerId,
        userId,
        date,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                "You can't create an appointment on the past date.",
            );
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                'You can only create an appointment between 8am and 5pm.',
            );
        }

        if (userId === providerId) {
            throw new AppError(
                "You can't create an appointment with yourself.",
            );
        }

        const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked.');
        }

        const appointment = await this.appointmentRepository.create({
            providerId,
            userId,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
