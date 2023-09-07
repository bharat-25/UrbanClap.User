"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userbookingdetailbyID = void 0;
const booking_schema_1 = require("../../models/BookingModel/booking.schema");
const userbookingdetailbyID = async (userId, startDate, endDate) => {
    try {
        const bookedServices = await booking_schema_1.BookingModel.find({
            slotdate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        });
        console.log(bookedServices);
        return bookedServices;
    }
    catch (error) {
        throw new Error("Error fetching services");
    }
};
exports.userbookingdetailbyID = userbookingdetailbyID;
//# sourceMappingURL=userbookingDetails.service.js.map