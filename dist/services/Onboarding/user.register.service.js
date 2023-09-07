"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_register_schema_1 = require("../../models/user.register.schema");
const registerUsers = async (userData) => {
    try {
        const { name, email, password, mobileno, isAdmin, addresses } = userData;
        const encryptPass = await bcrypt_1.default.hash(password, 5);
        const registerdata = new user_register_schema_1.UserData({ name, email, password: encryptPass, mobileno, isAdmin, addresses, });
        await registerdata.save();
        return registerdata;
    }
    catch (err) {
        return false;
    }
};
exports.registerUsers = registerUsers;
//# sourceMappingURL=user.register.service.js.map