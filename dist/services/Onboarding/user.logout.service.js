"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = void 0;
// import { verify_token } from "../../middleware/user.verifytoken";
const sessions_schema_1 = require("../../models/sessions.schema");
const user_register_schema_1 = require("../../models/user.register.schema");
const dotenv_1 = __importDefault(require("dotenv"));
const token_Model_1 = require("../../models/token.Model");
dotenv_1.default.config();
// const AccessJWTSECRET:any = process.env.Access_JWT_SECRET;
// const RefreshJWTSECRET:any = process.env.Refresh_JWT_SECRET;
class Logout {
    static async logout_user(userToken) {
        try {
            const userr = await user_register_schema_1.UserData.findOne({ _id: userToken.userId });
            if (userr) {
                const id = userr._id;
                const userSession = await sessions_schema_1.Session.findOne({ user_id: id });
                if (userr) {
                    if (userSession.status) {
                        const updatedUserSession = await sessions_schema_1.Session.findOneAndUpdate({ _id: userSession.id }, { status: !userSession.status });
                        const jti_session = await token_Model_1.tokenModel.findOneAndDelete({ userId: id });
                        console.log(updatedUserSession, jti_session);
                        return true;
                    }
                    else {
                        return ({ message: "User is already inactive" });
                    }
                }
                else {
                    return ({ message: "Session not found" });
                }
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }
}
exports.Logout = Logout;
//# sourceMappingURL=user.logout.service.js.map