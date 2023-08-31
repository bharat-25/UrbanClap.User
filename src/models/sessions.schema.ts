import mongoose from "mongoose";


interface Session {
    user_id: string;
    status:boolean;
  }

const SessionSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
        required: true,
    },
    status:{
        type: Boolean,
        required:true,
        default: false
    }
});

const Session = mongoose.model('Session',SessionSchema);

export {Session};