"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignRefreshToken = exports.SignAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const Access_JWT_SECRET = "MySecretKey";
const AccessJWTSECRET = process.env.Access_JWT_SECRET;
const RefreshJWTSECRET = process.env.Refresh_JWT_SECRET;
const SignAccessToken = (userId, isAdmin) => {
    const accessTokenId = (0, uuid_1.v4)();
    const payload = { userId: userId, isAdmin: isAdmin, acs_jti: accessTokenId };
    const option = { expiresIn: "3hr" };
    const token = jsonwebtoken_1.default.sign(payload, AccessJWTSECRET, option); // Token expires in 15 min
    console.log("Access_Token : ", token);
    return { token, accessTokenId };
};
exports.SignAccessToken = SignAccessToken;
const SignRefreshToken = (userId, isAdmin) => {
    const refreshTokenId = (0, uuid_1.v4)();
    const payload = { userId: userId, isAdmin: isAdmin, ref_jti: refreshTokenId };
    const option = { expiresIn: "24hr" };
    const token = jsonwebtoken_1.default.sign(payload, RefreshJWTSECRET, option); // Token expires in 7days
    console.log("Refresh_Token : ", token);
    return { token, refreshTokenId };
};
exports.SignRefreshToken = SignRefreshToken;
//# sourceMappingURL=generateJWT.js.map