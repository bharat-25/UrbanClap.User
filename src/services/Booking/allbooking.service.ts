import { BookingModel } from "../../models/BookingModel/booking.schema";

export const bookingdetails = async (user_Id: any) => {
  try {
    console.log(user_Id)
    const bookingServices = await BookingModel.find({ userId: user_Id.userId });
    console.log(bookingServices)
    return bookingServices;
  } catch (error) {
    throw new Error("Error fetching services");
  }
};
