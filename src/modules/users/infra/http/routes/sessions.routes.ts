import { Router } from 'express';
import AuthenticateUserService from '../../../../appointments/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
        email,
        password,
    });

    const userWithoutPassword = user.getUserWithoutPassword();

    return response.json({ userWithoutPassword, token });
});

export default sessionsRouter;
