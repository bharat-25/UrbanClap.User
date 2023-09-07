"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout_schema = exports.VerifyAccessToken = exports.OTPValidationMiddleware = exports.loginUserMiddleware = exports.registerUserMiddleware = exports.logout_Schema = exports.verifyTokenSchema = exports.otpVerificationValidatrion = exports.mobileLoginSchema = exports.loginValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const registerValidation = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(4).required(),
    mobileno: joi_1.default.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    isAdmin: joi_1.default.boolean(),
    addresses: joi_1.default.array().items(joi_1.default.object({
        addressType: joi_1.default.string().valid("home", "work", "other").required(),
        street: joi_1.default.string(),
        city: joi_1.default.string(),
        state: joi_1.default.string(),
        postalCode: joi_1.default.string(),
    })),
});
exports.loginValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(4).required(),
});
exports.mobileLoginSchema = joi_1.default.object({
    mobileno: joi_1.default.string().required(),
});
exports.otpVerificationValidatrion = joi_1.default.object({
    email: joi_1.default.string().required(),
    otp: joi_1.default.string().required(),
});
exports.verifyTokenSchema = joi_1.default.object({
    token: joi_1.default.string().required(),
});
exports.logout_Schema = joi_1.default.object({
    userId: joi_1.default.string().required(),
});
const validatedata = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        req.body = value;
        next();
    };
};
exports.registerUserMiddleware = validatedata(registerValidation);
exports.loginUserMiddleware = validatedata(exports.loginValidation);
exports.OTPValidationMiddleware = validatedata(exports.otpVerificationValidatrion);
exports.VerifyAccessToken = validatedata(exports.verifyTokenSchema);
exports.logout_schema = validatedata(exports.logout_Schema);
//# sourceMappingURL=user.datavalidate.js.map