import mongoose, { Schema } from "mongoose";


interface Session extends Document{
    user_id:object;
    status:boolean;
  }

const SessionSchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'UserData',
        required: true,
    },
    status:{
        type: Boolean,
        required:true,
        default: false
    }
},{timestamps:true});

const Session = mongoose.model('Session',SessionSchema);

export {Session};