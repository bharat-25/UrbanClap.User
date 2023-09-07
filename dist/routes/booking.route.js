"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booking_validation_1 = require("./../middleware/booking.validation");
const express_1 = __importDefault(require("express"));
const Booking_controller_1 = require("../controller/Booking/Booking.controller");
const checkuserlogin_validate_1 = require("../middleware/checkuserlogin.validate");
const cart_controller_1 = require("../controller/Cart/cart.controller");
const booking_validation_2 = require("../middleware/booking.validation");
const bookingRoute = express_1.default.Router();
bookingRoute.route('/').get();
bookingRoute.route('/bookingservice').post(booking_validation_2.BookingValidation, Booking_controller_1.newbookingservice);
bookingRoute.route('/getallbookings').post(checkuserlogin_validate_1.checkUserSession, Booking_controller_1.Getallbookings);
bookingRoute.route('/getbookId').post(checkuserlogin_validate_1.checkUserSession, Booking_controller_1.getbookId);
bookingRoute.route('/deletebooking').delete(booking_validation_2.deleteBookingValidation, checkuserlogin_validate_1.checkUserSession, Booking_controller_1.deletebooking);
bookingRoute.route('/user/cart').post(booking_validation_1.CartValidation, checkuserlogin_validate_1.checkUserSession, cart_controller_1.addToCart);
bookingRoute.route('/user/removedcart').delete(booking_validation_1.CartValidation, checkuserlogin_validate_1.checkUserSession, cart_controller_1.removeFromCart);
exports.default = bookingRoute;
//# sourceMappingURL=booking.route.js.map