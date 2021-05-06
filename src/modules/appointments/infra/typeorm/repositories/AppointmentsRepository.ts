import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async create({
        providerId,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ providerId, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async find(): Promise<Appointment[]> {
        const appointments = await this.ormRepository.find();
        return appointments;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }
}

export default AppointmentRepository;
