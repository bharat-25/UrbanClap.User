import mongoose, { Date, Schema } from "mongoose";
import { UserData } from "../user.register.schema";
import { string } from "joi";

interface Booking {
  userId: mongoose.Schema.Types.ObjectId;
  packageId: mongoose.Schema.Types.ObjectId;
  SlotDate: Date;
  SlotTime: string;
}

const BookingSchema = new mongoose.Schema({
  userId: { type:mongoose.Schema.Types.ObjectId,ref:'UserData',required: true },
  packageId: { type:mongoose.Schema.Types.ObjectId, ref:'package', required: true },
  name:{type:String,required:false},
  description:{type:String,required:false},
  price:{type:Number,required:false},
  slotdate: { type: Date, required: true },
  slotTime: { type: String, required: true }
},{timestamps:true});

const PackageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category_id: { type: Number, required: true },
  price: { type: Number, required: true },
  parent_id: { type: [Number], ref: "Services", required: true, default: null },
});

const PackageModel = mongoose.model("Packages", PackageSchema);
const BookingModel = mongoose.model("Booking", BookingSchema);

export { BookingModel,PackageModel };
