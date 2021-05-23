import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IListAllUsersDTO from '../dtos/IListAllUsersDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
    findAll(criteria: IListAllUsersDTO): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(userData: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
