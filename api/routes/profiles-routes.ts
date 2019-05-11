
import { NextFunction, Response, Router } from 'express';
import { IUserModel, User } from '../models/user-model';
import { authentication } from '../utilities/authentication';
import { ProfileRequest } from '../interfaces/requests-interface';

const router: Router = Router();


/**
 * PARAM :username
 */
router.param('username', (req: ProfileRequest, res: Response, next: NextFunction, username: string) => {
	User.findOne({username}).then( (user: IUserModel) => {
			req.profile = user;
			return next();
		}).catch(next);
});


/**
 * GET /api/profiles/:username
 */
router.get('/:username', authentication.optional,	(req: ProfileRequest, res: Response, next: NextFunction) => {
	if (req.payload) {
		User.findById(req.payload.id).then( (user: IUserModel) => {
				 res.status(200).json({profile: req.profile.formatAsProfileJSON(user)});
			}).catch(next);
	} else {
		res.status(200).json({profile: req.profile.formatAsProfileJSON(req.profile)});
	}

});

export const ProfilesRoutes: Router = router;
