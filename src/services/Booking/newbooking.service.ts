import { date } from 'joi';
import { BookingModel } from "../../models/BookingModel/booking.schema";
import { UserData } from "../../models/user.register.schema";

export const newbooking = async (data:any) => {
try{
  const { userId, serviceId, slotdate, slotTime } = data;

        console.log(".........",)
       
        const booking = new BookingModel({
          userId,
          serviceId,
          slotdate,
          slotTime
        });
        await booking.save();
        return booking;

}catch{
  throw new Error("Error fetching services");
}

}

