import { Router } from 'express';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(ensureAuthenticated);

userProfileRouter.get('/', userProfileController.show);
userProfileRouter.put('/', userProfileController.update);

export default userProfileRouter;
