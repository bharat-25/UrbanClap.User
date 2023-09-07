"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingdetails = void 0;
const booking_schema_1 = require("../../models/BookingModel/booking.schema");
const bookingdetails = async (user_Id) => {
    try {
        console.log(user_Id);
        const bookingServices = await booking_schema_1.BookingModel.find({ userId: user_Id.userId });
        console.log(bookingServices);
        return bookingServices;
    }
    catch (error) {
        throw new Error("Error fetching services");
    }
};
exports.bookingdetails = bookingdetails;
//# sourceMappingURL=allbooking.service.js.map