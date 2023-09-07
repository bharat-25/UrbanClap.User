"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTokens = exports.logoutcontrol = exports.verifyOTPController = exports.Login = exports.registerControl = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_logout_service_1 = require("../../services/Onboarding/user.logout.service");
const user_register_service_1 = require("../../services/Onboarding/user.register.service");
const user_register_schema_1 = require("../../models/user.register.schema");
const user_login_service_1 = require("../../services/Onboarding/user.login.service");
const console_1 = require("console");
const user_datavalidate_1 = require("../../middleware/user.datavalidate");
const redis_1 = __importDefault(require("../../utils/redis"));
const sessions_schema_1 = require("../../models/sessions.schema");
const user_session_controller_1 = require("./user.session.controller");
const decodeToken_1 = require("../../utils/decodeToken");
const generateJWT_1 = require("../../utils/generateJWT");
const services_responses_1 = require("../../responses/services.responses");
const token_Model_1 = require("../../models/token.Model");
//<----------------------------------------- SIGNUP ------------------------------------------------->
const registerControl = async (req, res) => {
    try {
        if (req.body == undefined) {
            res.status(services_responses_1.RESPONSE_CODES.BADREQUEST).json({ Message: services_responses_1.RESPONSE_MESSAGES.BAD_REQUEST });
        }
        else {
            let result = await isUserExist(req);
            if (!result) {
                const userData = req.body;
                const newUser = await (0, user_register_service_1.registerUsers)(userData);
                res.status(services_responses_1.RESPONSE_CODES.CREATED).json({ message: services_responses_1.RESPONSE_MESSAGES.CREADTED, user: newUser });
            }
            else {
                res.status(services_responses_1.RESPONSE_CODES.CONFLICT).json({ message: services_responses_1.RESPONSE_MESSAGES.ALREADY_EXIST });
            }
        }
    }
    catch (error) {
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: services_responses_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
exports.registerControl = registerControl;
const isUserExist = async (req) => {
    try {
        // data=await Register.findOne({mobileno:req.body.mobileno});
        const data = await user_register_schema_1.UserData.findOne({ email: req.body.email });
        return data;
    }
    catch {
        console.error("error occured", console_1.error);
    }
};
//<------------------------------------ LOGIN WITH Mail OTP ---------------------------------------------------->
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = user_datavalidate_1.loginValidation.validate(req.body);
        if (error) {
            return res.status(services_responses_1.RESPONSE_CODES.BADREQUEST).json({ message: "Invalid data" });
        }
        const user = await user_register_schema_1.UserData.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            return res.status(services_responses_1.RESPONSE_CODES.NOTFOUND).json({ error: services_responses_1.RESPONSE_MESSAGES.NOT_FOUND });
        }
        const pass = await bcrypt_1.default.compare(password.toString(), user?.password);
        console.log(pass);
        if (!pass) {
            return res.status(services_responses_1.RESPONSE_CODES.UNAUTHORIZED).json({ error: "Wrong Password" });
        }
        const isSession = await sessions_schema_1.Session.findOne({ user_id: user._id });
        if (isSession) {
            if (isSession.status) {
                return res.status(services_responses_1.RESPONSE_CODES.BADREQUEST).json({ message: "User is already logged in" });
            }
        }
        const otp = await (0, user_login_service_1.login)(email);
        console.log(email, otp);
        redis_1.default.set(email, otp, { EX: 300 });
        const result = (0, user_login_service_1.sendEmail)(email, otp);
        const sess = await user_session_controller_1.session.maintainSession(user);
        res.status(200).json({ message: "OTP sent successfully and OTP valid only for 5 min" });
        // -----------CODE FOR SEND OTP TO MOBILE NO-------------
        // const otp = await login(mobileno);
        // await storeOTPInRedis(mobileno, otp);
        // // send OTP to client's phone number using Twilio API
        // sendOTPToMobile(mobileno, otp);
        //--------CODE FOR SEND OTP TO EMAIL-----
    }
    catch (error) {
        console.error(error);
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: services_responses_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
exports.Login = Login;
//<------------------------------------------ VERIFY OTP WITH EMAIL-----------------------------------------------------
const verifyOTPController = async (req, res) => {
    try {
        const { error } = user_datavalidate_1.otpVerificationValidatrion.validate(req.body);
        const userId = req.body.email;
        if (error) {
            return res.status(services_responses_1.RESPONSE_CODES.BADREQUEST).json({ message: "Invalid data", error: error.details });
        }
        const user_data = await user_register_schema_1.UserData.findOne({ email: userId });
        console.log(user_data);
        const { email, otp } = req.body;
        const isValidOTP = await (0, user_login_service_1.verifyOTP)(otp, email);
        if (!isValidOTP) {
            return res.status(services_responses_1.RESPONSE_CODES.UNAUTHORIZED).json({ message: services_responses_1.RESPONSE_MESSAGES.UNAUTHORIZED });
        }
        // const sess = await session.maintainSession(userId);
        redis_1.default.set(`status:${userId}`, 'true');
        const isSession = await sessions_schema_1.Session.findOne({ user_id: user_data._id });
        if (isSession) {
            if (isSession.status == false) {
                const sess = await user_session_controller_1.session.maintainSession(user_data);
            }
        }
        const AccessToken = (0, generateJWT_1.SignAccessToken)(user_data._id, user_data.isAdmin);
        const RefreshToken = (0, generateJWT_1.SignRefreshToken)(user_data._id, user_data.isAdmin);
        await token_Model_1.tokenModel.create({ userId: user_data._id, accessTokenId: AccessToken.accessTokenId, refreshTokenId: RefreshToken.refreshTokenId });
        res.status(services_responses_1.RESPONSE_CODES.SUCCESS).json({ message: "Successfully login", Access_token: AccessToken, Refresh_token: RefreshToken });
    }
    catch (error) {
        console.error(error);
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    }
};
exports.verifyOTPController = verifyOTPController;
//<--------------------------------------------- LOGOUT ----------------------------------------->
const logoutcontrol = async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        console.log(token);
        const userToken = await (0, decodeToken_1.verify_token)(token);
        // const sessionStatus = await client.get(`status:${userToken.email}`);
        // console.log(sessionStatus)
        const result = await user_logout_service_1.Logout.logout_user(userToken);
        if (result) {
            // if (sessionStatus === 'true') {
            //   await client.set(`status:${userToken.email}`, 'false');
            res.status(200).json({ message: "Successfully logout", result });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error, Token Expired!" });
    }
};
exports.logoutcontrol = logoutcontrol;
//<---------------------------------------------New Token--------------------------------------------------->
const NewTokens = async (req, res) => {
    try {
        const refresh_token = req.headers.authorization?.replace('Bearer ', '');
        if (!refresh_token) {
            return res.status(401).json({ message: "Bad Request, JWT expired!" });
        }
        const userId = await (0, decodeToken_1.verify_refresh_token)(refresh_token);
        const isadmin = await (0, decodeToken_1.verify_refresh_token)(refresh_token);
        const AccessToken = (0, generateJWT_1.SignAccessToken)(userId, isadmin);
        const RefreshToken = (0, generateJWT_1.SignRefreshToken)(userId, isadmin);
        res.status(200).json({ Access_token: AccessToken, Refresh_token: RefreshToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};
exports.NewTokens = NewTokens;
//<----------------------------- VERIFY OTP with MOBILE NO------------------------------------------------------>
// export const verifyOTPController = async (req: Request, res: Response) => {
//     try {
//       const { error } = otpVerificationSchema.validate(req.body);
//       const userId=req.body.email;
//       if (error) {
//         return res.status(RESPONSE_CODES.BADREQUEST).json({ message: 'Invalid data', error: error.details });
//       }
//       const { email,mobileno, otp } = req.body;
//       const isValidOTP = await verifyOTP(otp, mobileno,email);
//       if (!isValidOTP) {
//         return res.status(401).json({ message: 'Invalid OTP' });
//       }
//       // await setUserLoginStatus(userId, true);
//       const jwtToken = generateJWTToken(userId);
// await redisClient.set(`session:${}`, 'true');
//       res.status(200).json({ message: 'Successfully login' ,token: jwtToken});
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'An error occurred' });
//     }
//   };
//# sourceMappingURL=user.controller.js.map