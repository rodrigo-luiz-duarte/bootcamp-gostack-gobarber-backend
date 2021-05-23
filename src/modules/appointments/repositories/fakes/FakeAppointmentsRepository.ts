import { v4 as uuid } from 'uuid';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindAllAppointmentsInMonthByProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentsInMonthByProviderDTO';
import IFindAllAppointmentsInDayByProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentsInDayByProviderDTO';
import IAppointmentsRepository from '../IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async create({
        providerId,
        userId,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, {
            id: uuid(),
            date,
            providerId,
            userId,
            createAt: new Date(),
        });

        this.appointments.push(appointment);

        return appointment;
    }

    public async findAll(providerId?: string): Promise<Appointment[]> {
        let appointments: Appointment[] = [];

        if (providerId) {
            appointments = this.appointments.filter(
                appointment => appointment.providerId === providerId,
            );
        } else {
            appointments = [...this.appointments];
        }

        return appointments;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }

    public async findAllInMonthByProvider({
        providerId,
        year,
        month,
    }: IFindAllAppointmentsInMonthByProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.providerId === providerId &&
                getYear(appointment.date) === year &&
                getMonth(appointment.date) + 1 === month,
        );

        return appointments;
    }

    public async findAllInDayByProvider({
        providerId,
        year,
        month,
        day,
    }: IFindAllAppointmentsInDayByProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.providerId === providerId &&
                getYear(appointment.date) === year &&
                getMonth(appointment.date) + 1 === month &&
                getDate(appointment.date) === day,
        );

        return appointments;
    }
}

export default FakeAppointmentRepository;
