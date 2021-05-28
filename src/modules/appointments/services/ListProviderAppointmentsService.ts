import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
    providerId: string;
    year: number;
    month: number;
    day: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        providerId,
        year,
        month,
        day,
    }: IRequest): Promise<Appointment[]> {
        const cacheKey = `appointments-list:${providerId}:${year}-${month}-${day}`;

        let appointments = await this.cacheProvider.getValue<Appointment[]>(
            cacheKey,
        );

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayByProvider(
                { providerId, year, month, day },
            );

            await this.cacheProvider.save<Appointment[]>(
                cacheKey,
                classToClass(appointments),
            );
        }

        return appointments;
    }
}

export default ListProviderAppointmentsService;
