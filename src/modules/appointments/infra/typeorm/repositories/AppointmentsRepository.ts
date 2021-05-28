import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsInDayByProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentsInDayByProviderDTO';
import IFindAllAppointmentsInMonthByProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentsInMonthByProviderDTO';
import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async create({
        providerId,
        userId,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            providerId,
            userId,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async findAll(providerId?: string): Promise<Appointment[]> {
        let appointments: Appointment[] = [];

        if (providerId) {
            appointments = await this.ormRepository.find({
                where: {
                    providerId,
                },
            });
        } else {
            appointments = await this.ormRepository.find();
        }
        return appointments;
    }

    public async findByDate(
        date: Date,
        providerId: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date, providerId },
        });

        return findAppointment;
    }

    public async findAllInMonthByProvider({
        providerId,
        year,
        month,
    }: IFindAllAppointmentsInMonthByProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                providerId,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user'],
        });

        return appointments;
    }

    public async findAllInDayByProvider({
        providerId,
        year,
        month,
        day,
    }: IFindAllAppointmentsInDayByProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                providerId,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user'],
        });

        return appointments;
    }
}

export default AppointmentRepository;
