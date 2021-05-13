import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';

import IAppointmentsRepository from '../IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async create({
        providerId,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, {
            id: uuid(),
            date,
            providerId,
            createAt: new Date(),
        });

        this.appointments.push(appointment);

        return appointment;
    }

    public async find(): Promise<Appointment[]> {
        const appointments: Appointment[] = [...this.appointments];

        return appointments;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }
}

export default FakeAppointmentRepository;
