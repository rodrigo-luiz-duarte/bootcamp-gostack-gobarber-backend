import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProvidersDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentRepository;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentRepository();
        listProvidersDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the providers available time', async () => {
        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 13, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 14, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 24, 11).getTime();
        });

        const availability = await listProvidersDayAvailabilityService.execute({
            providerId: 'provider-id',
            year: 2021,
            month: 5,
            day: 24,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 12, available: true },
                { hour: 13, available: false },
                { hour: 14, available: false },
                { hour: 15, available: true },
                { hour: 16, available: true },
            ]),
        );
    });
});
