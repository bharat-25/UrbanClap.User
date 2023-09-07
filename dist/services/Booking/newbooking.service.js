"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newbooking = void 0;
const booking_schema_1 = require("../../models/BookingModel/booking.schema");
// export const newbooking = async (data: any) => {
//   try {
//     const { userId, serviceId, slotdate, slotTime } = data;
//     const booking = new BookingModel({ userId, serviceId, slotdate, slotTime });
//     await booking.save();
//     return booking;
//   } catch {
//     throw new Error("Error fetching services");
//   }
// };
const newbooking = async (data) => {
    try {
        if (!data) {
            return ("Invalid data");
        }
        const pack_data = await booking_schema_1.PackageModel.findOne({ _id: data.packageId });
        console.log(pack_data?.name, pack_data?.description, pack_data?.price);
        const pack = (pack_data?.name, pack_data?.description, pack_data?.price);
        const documentToInsert = {
            userId: data?.userId,
            packageId: data?.packageId,
            name: pack_data?.name,
            describe: pack_data?.description,
            price: pack_data?.price,
            slotdate: data?.slotdate,
            slotTime: data?.slotTime
        };
        console.log(documentToInsert);
        const booking = await booking_schema_1.BookingModel.create(documentToInsert);
        console.log(booking);
        return booking;
    }
    catch {
        throw new Error("Error fetching services");
    }
};
exports.newbooking = newbooking;
//# sourceMappingURL=newbooking.service.js.map