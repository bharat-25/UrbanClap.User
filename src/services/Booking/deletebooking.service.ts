import { ObjectId } from "mongoose";
import { BookingModel } from "../../models/BookingModel/booking.schema";

export const userbookingdelete = async ( bookingId:any ) => {
  try {
    console.log(bookingId)
    const del=await BookingModel.findOneAndDelete({_id: bookingId});
    if(del)
    {
      return 
    };
  } catch (error) {
    throw new Error("Error deleting services");
  }
};
