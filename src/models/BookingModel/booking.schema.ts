import mongoose, { Date, Schema } from "mongoose";

interface Booking {
  // userId: object;
  serviceId: string;
  SlotDate: Date;
  SlotTime: string;
}

const BookingSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId,  ref: 'Session',required: true },
  // userId: { type: String,required: true },
  serviceId: { type:String,  required: true },
  slotdate: { type: Date, required: true },
  slotTime: { type: String, required: true }
},{timestamps:true});

const BookingModel = mongoose.model("Booking", BookingSchema);
export { BookingModel };
