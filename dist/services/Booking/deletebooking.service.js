"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userbookingdelete = void 0;
const booking_schema_1 = require("../../models/BookingModel/booking.schema");
const userbookingdelete = async (bookingId) => {
    try {
        console.log(bookingId);
        const del = await booking_schema_1.BookingModel.findOneAndDelete({ _id: bookingId });
        if (del) {
            return;
        }
        ;
    }
    catch (error) {
        throw new Error("Error deleting services");
    }
};
exports.userbookingdelete = userbookingdelete;
//# sourceMappingURL=deletebooking.service.js.map