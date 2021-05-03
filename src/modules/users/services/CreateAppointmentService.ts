import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../../appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '../../appointments/infra/typeorm/repositories/AppointmentsRepository';
import AppError from '../../../shared/errors/AppError';

interface Request {
    providerId: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ providerId, date }: Request): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(
            AppointmentRepository,
        );

        const appoitmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentRepository.findByDate(
            appoitmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked.');
        }

        const appointment = appointmentRepository.create({
            providerId,
            date: appoitmentDate,
        });

        await appointmentRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
