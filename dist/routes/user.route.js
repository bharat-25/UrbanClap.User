"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_datavalidate_1 = require("./../middleware/user.datavalidate");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/User/user.controller");
const user_datavalidate_2 = require("../middleware/user.datavalidate");
const Admin_1 = require("../controller/Admin");
const checkuserlogin_validate_1 = require("../middleware/checkuserlogin.validate");
const userRoute = express_1.default.Router();
userRoute.route('/').get();
userRoute.route('/signup').post(user_datavalidate_2.registerUserMiddleware, user_controller_1.registerControl);
userRoute.route('/login').post(user_datavalidate_2.loginUserMiddleware, user_controller_1.Login);
userRoute.route('/login/verifyotp').post(user_datavalidate_2.OTPValidationMiddleware, user_controller_1.verifyOTPController);
userRoute.route("/CheckAdmin").get(Admin_1.checkadmin);
userRoute.route('/logout').post(user_datavalidate_1.logout_schema, user_controller_1.logoutcontrol);
userRoute.route("/GenerateNewTokens").post(checkuserlogin_validate_1.checkUserSession, user_controller_1.NewTokens);
exports.default = userRoute;
//# sourceMappingURL=user.route.js.map