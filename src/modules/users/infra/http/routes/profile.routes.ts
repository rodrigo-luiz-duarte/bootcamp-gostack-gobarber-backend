import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(ensureAuthenticated);

userProfileRouter.get('/', userProfileController.show);
userProfileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            oldPassword: Joi.string(),
            password: Joi.when('oldPassword', {
                is: Joi.exist(),
                then: Joi.required(),
            }),
            passwordConfirmation: Joi.when('password', {
                is: Joi.exist(),
                then: Joi.valid(Joi.ref('password')).required(),
            }),
        },
    }),
    userProfileController.update,
);

export default userProfileRouter;
