import { ObjectId } from "mongoose";
import { BookingModel } from "../../models/BookingModel/booking.schema";

export const userbookingdelete = async ( bookingId:any ) => {
  try {
    console.log(bookingId)
    // const result=await BookingModel.deleteOne({ _id: bookingId, user_id: userId })
    await BookingModel.findOneAndDelete({_id: bookingId});
    return true;
  } catch (error) {
    throw new Error("Error deleting services");
  }
};
