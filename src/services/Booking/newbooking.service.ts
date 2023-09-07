import { date } from "joi";
import { BookingModel, PackageModel } from "../../models/BookingModel/booking.schema";
import { cartModel } from "../../models/BookingModel/cart.model";

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
export const newbooking = async (data: any) => {
  try {
    if (!data) {
      return ("Invalid data");
    }
    const pack_data=await PackageModel.findOne({_id:data.packageId})
    console.log(pack_data?.name,pack_data?.description,pack_data?.price
      )
      const pack:any=(pack_data?.name,pack_data?.description,pack_data?.price)
    const documentToInsert = {
      userId:data?.userId,
      packageId:data?.packageId,
      name:pack_data?.name,
      describe:pack_data?.description,
      price:pack_data?.price,
      slotdate:data?.slotdate,
      slotTime:data?.slotTime

    };
    console.log(documentToInsert)
    const booking = await BookingModel.create(documentToInsert);
    console.log(booking)
    return booking;
  } catch {
    throw new Error("Error fetching services");
  }
};
