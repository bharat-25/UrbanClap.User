"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = exports.deleteBookingValidation = exports.BookingValidation = exports.cartValidatrion = exports.deleteValidatrion = void 0;
const joi_1 = __importDefault(require("joi"));
const BookingValid = joi_1.default.object({
    userId: joi_1.default.string(),
    packageId: joi_1.default.string(),
    slotdate: joi_1.default.date(),
    slotTime: joi_1.default.string(),
});
exports.deleteValidatrion = joi_1.default.object({
    bookingId: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
});
exports.cartValidatrion = joi_1.default.object({
    userId: joi_1.default.string().required(),
    packageId: joi_1.default.string().required(),
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
exports.BookingValidation = validatedata(BookingValid);
exports.deleteBookingValidation = validatedata(exports.deleteValidatrion);
exports.CartValidation = validatedata(exports.cartValidatrion);
//# sourceMappingURL=booking.validation.js.map