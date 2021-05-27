import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
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

        const formattedDate = format(
            appointmentDate,
            "dd/MM/yyyy 'às' HH:mm'h'",
        );

        await this.notificationsRepository.create({
            recipientId: providerId,
            content: `Novo agendamento criado para ${formattedDate}`,
        });

        const cacheKey = `appointments-list:${providerId}:${format(
            appointmentDate,
            'yyyy-M-d',
        )}`;

        await this.cacheProvider.invalidate(cacheKey);

        return appointment;
    }
}

export default CreateAppointmentService;
