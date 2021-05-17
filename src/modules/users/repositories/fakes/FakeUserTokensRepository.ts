import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { v4 as uuid } from 'uuid';

import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
    private userTokens: UserToken[] = [];

    public async generate(userId: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.userTokens.find(t => t.token === token);
        return userToken;
    }
}

export default FakeUserTokensRepository;
