import ICreateUserDTO from '../dto/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
    find(): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(userData: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
