import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentRepository();

        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the appointments of a provider in the specific date', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 13, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            date: new Date(2021, 4, 24, 14, 0, 0),
            providerId: 'provider-id',
            userId: 'user-id',
        });

        const appointments = await listProviderAppointmentsService.execute({
            providerId: 'provider-id',
            year: 2021,
            month: 5,
            day: 24,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
