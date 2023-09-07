import mongoose, { Date, Schema } from "mongoose";
import { UserData } from "../user.register.schema";

interface cart {
  userId: object;
  packageId: string;
}

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,ref:'UserData',required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref:'package', required: true },
},{timestamps:true});

const cartModel = mongoose.model("Cart", CartSchema);
export { cartModel };
