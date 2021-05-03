import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import User, { UserWithoutPassword } from '../infra/typeorm/entities/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: Request): Promise<UserWithoutPassword> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('E-mail address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        const userWithoutPassword = user.getUserWithoutPassword();

        return userWithoutPassword;
    }
}

export default CreateUserService;
