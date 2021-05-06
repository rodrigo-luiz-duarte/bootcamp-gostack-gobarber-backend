import { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
        email,
        password,
    });

    const userWithoutPassword = user.getUserWithoutPassword();

    return response.json({ userWithoutPassword, token });
});

export default sessionsRouter;
