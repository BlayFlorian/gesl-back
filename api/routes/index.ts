
import { Router } from 'express';
import { UserRoutes } from './user-routes';
import { UsersRoutes } from './users-routes';
import { ProfilesRoutes } from './profiles-routes';


const router: Router = Router();

router.use('/user', UserRoutes);
router.use('/users', UsersRoutes);
router.use('/profiles', ProfilesRoutes);


export const MainRouter: Router = router;
