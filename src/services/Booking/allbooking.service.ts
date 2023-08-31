import { BookingModel } from "../../models/BookingModel/booking.schema";

export const bookingdetails = async (userId: any) => {
  try {
    const bookingServices = await BookingModel.findOne({ user_id: userId });
    return bookingServices;
  } catch (error) {
    throw new Error("Error fetching salon services");
  }
};
