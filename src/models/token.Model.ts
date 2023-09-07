
import { object } from "joi";
import mongoose, { Date, Schema } from "mongoose";
import { UserData } from "./user.register.schema";
// import { UUID } from 'uuid';


interface token extends Document {
  userId:String,
  accessTokenId: Schema.Types.UUID;
  refreshTokenId: Schema.Types.UUID;
}

const TokenSchema = new mongoose.Schema({
  // userId: { type: Schema.Types.ObjectId,  ref: 'Session',required: true },
  userId:{type:Schema.Types.ObjectId,ref:'UserData',required:true},
  accessTokenId: { type: Schema.Types.UUID,required: true },
  refreshTokenId: { type:Schema.Types.UUID,  required: true },
},{timestamps:true});

const tokenModel = mongoose.model("token", TokenSchema);
export { tokenModel };
