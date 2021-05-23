import { v4 as uuid } from 'uuid';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IListAllUsersDTO from '@modules/users/dtos/IListAllUsersDTO';
import IUsersRepository from '../IUsersRepository';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(u => u.id === id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(u => u.email === email);
        return user;
    }

    public async save(user: User): Promise<User> {
        const userIndex = this.users.findIndex(u => u.id === user.id);

        if (userIndex < 0) {
            throw new Error('User not found');
        }

        this.users[userIndex] = user;

        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);

        return user;
    }

    public async findAll({ exceptUserId }: IListAllUsersDTO): Promise<User[]> {
        let usersList: User[] = [...this.users];

        if (exceptUserId) {
            usersList = usersList.filter(user => user.id !== exceptUserId);
        }
        return usersList;
    }
}

export default FakeUsersRepository;
