import { logout_schema } from './../middleware/user.datavalidate';

import express from 'express';
import { Login, NewTokens, logoutcontrol, registerControl, verifyOTPController ,} from '../controller/User/user.controller';
import { registerUserMiddleware ,loginUserMiddleware,OTPValidationMiddleware, VerifyAccessToken} from '../middleware/user.datavalidate';
import { adminvalid } from '../middleware/admin.validate';
import { authenticateToken } from '../middleware/user.authorization';
import {verify_token, verifytoken } from '../utils/decodeToken';
import { checkadmin } from '../controller/Admin';
import { checkUserSession, checkUserSessionfordelete } from '../middleware/checkuserlogin.validate';
const userRoute = express.Router();

userRoute.route('/').get();
userRoute.route('/signup').post(registerUserMiddleware,registerControl);
userRoute.route('/login').post(loginUserMiddleware,Login); 
userRoute.route('/login/verifyotp').post(OTPValidationMiddleware,verifyOTPController)
userRoute.route("/CheckAdmin").get(checkadmin);
userRoute.route('/logout').post(logout_schema,logoutcontrol ); 
userRoute.route("/GenerateNewTokens").post(checkUserSession,NewTokens);

export default userRoute;

