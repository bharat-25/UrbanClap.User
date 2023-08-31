import { boolean } from "joi";
import mongoose, { Schema } from "mongoose";
enum AddressType {
    HOME = 'home',
    WORK = 'work',
    OTHER = 'other',
  }

  interface Address {
    addressType: AddressType;
    address: string;
  }
const UserSchema = new Schema({
    name: {
        type: String,
        required:  [true,'Please provide an name '],
        minlength: 3
    },
    email: {
        type: String,
        required: [true,'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide a password'],
        minlength: 6  
    },
    mobileno:{
        type : Number ,
        required:true,
        minlength:10,
        maxlength:13
    },
    isAdmin:{
      type: Boolean,
      default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
      type: Boolean,
      default: false, // User is initially not logged in
    },
    addresses: [
        {
          addressType: {
            type: String,
            enum: Object.values(AddressType),
            default: AddressType.HOME,
          },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        },
      ],
      cart:[]
})

const UserData = mongoose.model('UserData', UserSchema);
export { UserData };