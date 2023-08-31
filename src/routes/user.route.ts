
import express from 'express';
import { Login, NewTokens, logoutcontrol, registerControl, verifyOTPController ,} from '../controller/User/user.controller';
import { registerUserMiddleware ,loginUserMiddleware,OTPValidationMiddleware, VerifyAccessToken} from '../middleware/user.datavalidate';
import { adminvalid } from '../middleware/admin.validate';
import { authenticateToken } from '../middleware/user.authorization';
import { verify_refresh_token, verify_token } from '../middleware/user.verifytoken';
import { checkadmin } from '../controller/Admin';
import { checkUserSession } from '../middleware/checkuserlogin.validate';
const userRoute = express.Router();

userRoute.route('/').get();
userRoute.route('/signup').post(registerUserMiddleware,registerControl);
userRoute.route('/login').post(loginUserMiddleware,Login); 
userRoute.route('/login/verifyotp').post(OTPValidationMiddleware,verifyOTPController)
userRoute.route("/verifyAccessToken").post(VerifyAccessToken,verify_token);
userRoute.route("/verifyRefreshToken").post(VerifyAccessToken,verify_refresh_token);
userRoute.route("/CheckAdmin").post(checkadmin);
userRoute.route('/logout').get(checkUserSession,authenticateToken,logoutcontrol ); 
userRoute.route("/GenerateNewTokens").post(checkUserSession,NewTokens);

export default userRoute;

