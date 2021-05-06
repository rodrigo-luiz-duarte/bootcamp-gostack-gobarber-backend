import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import CreateUserService from '../../../services/CreateUserService';
import uploadConfig from '../../../../../config/upload';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );

        const user = await updateUserAvatarService.execute({
            userId: request.user.id,
            avatarFilename: request.file.filename,
        });

        const userWithoutPassword = user.getUserWithoutPassword();

        return response.json(userWithoutPassword);
    },
);

export default usersRouter;
