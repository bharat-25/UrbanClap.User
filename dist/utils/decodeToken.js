"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_refresh_token = exports.verifytoken = exports.verify_token = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const AccessJWTSECRET = process.env.Access_JWT_SECRET;
const RefreshJWTSECRET = process.env.Refresh_JWT_SECRET;
const verify_token = async (token) => {
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, AccessJWTSECRET);
        return decoded;
    }
    else {
        return { error: "Access Token is not provided" };
    }
};
exports.verify_token = verify_token;
const verify_refresh_token = async (token) => {
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, RefreshJWTSECRET);
        return decoded;
    }
    else {
        return { error: "Refresh Token is not provided" };
    }
};
exports.verify_refresh_token = verify_refresh_token;
const verifytoken = async (token) => {
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, AccessJWTSECRET);
        if (!decoded) {
            return "Invalid token";
        }
        return decoded;
    }
    else {
        return { error: "Access Token is not provided" };
    }
};
exports.verifytoken = verifytoken;
//# sourceMappingURL=decodeToken.js.map