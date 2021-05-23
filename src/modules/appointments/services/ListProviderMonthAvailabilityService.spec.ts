import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProvidersMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentRepository;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentRepository();
        listProvidersMonthAvailabilityService = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the providers available dates', async () => {
        await fakeAppointmentsRepository.create({
            date: new Date(2021, 3, 24, 8, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 8, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 9, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 10, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 11, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 12, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

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

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 15, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 16, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 17, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 25, 8, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        const availability = await listProvidersMonthAvailabilityService.execute(
            {
                providerId: 'provider-id',
                year: 2021,
                month: 5,
            },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 23, available: true },
                { day: 24, available: false },
                { day: 25, available: true },
                { day: 26, available: true },
            ]),
        );
    });
});
