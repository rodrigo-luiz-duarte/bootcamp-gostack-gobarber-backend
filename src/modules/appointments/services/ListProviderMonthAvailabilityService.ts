import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, endOfDay, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    providerId: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        providerId,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthByProvider(
            { providerId, year, month },
        );

        const daysInMonth = getDaysInMonth(new Date(year, month - 1));

        // Cria um array com os dias do mês de acordo com a qtde
        // de dias do mês obtida acima.
        const eachDayArray = Array.from(
            {
                length: daysInMonth,
            },
            (value, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const compareDate = endOfDay(new Date(year, month - 1, day));

            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available:
                    isAfter(compareDate, new Date()) &&
                    appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
