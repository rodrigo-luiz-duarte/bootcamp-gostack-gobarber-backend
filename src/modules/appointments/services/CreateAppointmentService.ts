import { startOfHour } from 'date-fns';
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
        const appoitmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
            appoitmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked.');
        }

        const appointment = await this.appointmentRepository.create({
            providerId,
            userId,
            date: appoitmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
