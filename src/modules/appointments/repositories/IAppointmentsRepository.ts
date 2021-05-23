import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsInMonthByProviderDTO from '../dtos/IFindAllAppointmentsInMonthByProviderDTO';
import IFindAllAppointmentsInDayByProviderDTO from '../dtos/IFindAllAppointmentsInDayByProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findAll(providerId?: string): Promise<Appointment[]>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthByProvider(
        criteria: IFindAllAppointmentsInMonthByProviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayByProvider(
        criteria: IFindAllAppointmentsInDayByProviderDTO,
    ): Promise<Appointment[]>;
}
