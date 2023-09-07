import { BookingModel } from "../../models/BookingModel/booking.schema";

export const userbookingdetailbyID = async (userId: string,startDate: string,endDate: string) => {
  try {
    const bookedServices = await BookingModel.find({
      slotdate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
    console.log(bookedServices);
    return bookedServices;
  } catch (error) {
    throw new Error("Error fetching services");
  }
};
