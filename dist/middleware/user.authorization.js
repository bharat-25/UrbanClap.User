"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { verifyJWTToken } from '../services/user.login.service';
dotenv_1.default.config();
const AccessJWTSECRET = process.env.Access_JWT_SECRET;
const RefreshJWTSECRET = process.env.Refresh_JWT_SECRET;
const authenticateToken = async (req, res, next) => {
    let token = req.headers["authorization"];
    token = token.slice(7, token.length);
    if (token == null) {
        res.status(401).send("unauthorized user to access.");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, AccessJWTSECRET);
        if (req.user = decoded.userId) {
            console.log(decoded);
            next();
        }
    }
    catch (err) {
        res.status(401).json({ error: "Unauthorized" });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=user.authorization.js.map