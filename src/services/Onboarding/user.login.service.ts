import { Login } from "../../controller/User/user.controller";
import nodemailer from "nodemailer";
import { UserData } from "../../models/user.register.schema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateOTP from "../../utils/generateOTP";
import client from "../../utils/redis";

const JWT_SECRET = "MySecretKey";
dotenv.config();

//<------------------------------- LOGIN WITH MAIL OTP -----------------------------------------

export const verifyOTP = async (receivedOTP: string, email: string) => {
  console.log(email);
  const expectedOTP = await client.get(email);
  console.log(expectedOTP);
  if (!expectedOTP || expectedOTP !== receivedOTP) {
    return false;
  }
  return true;
};
export const storeOTPInRedis = async (email: string, otp: string) => {
  await client.setEx(email, 300, otp); // Expires in 5 minutes (300 seconds)
};

export const login = async (email: string) => {
  try {
    const otp = generateOTP();
    // sendEmail(email,otp);

    return otp;
  } catch (error) {
    throw error;
  }
};

export const sendEmail = async (email: string, otp: string) => {
  try {
    await transporter.sendMail({
      from: process.env.My_Mail,
      to: email,
      subject: "Login OTP",
      text: `This is your login verify OTP and valid only for 5 min.Your OTP is: ${otp}`,
    });
    console.log("Email Sent successfully");
  } catch (error) {
    console.log("Error:", error);
  }
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.My_Mail,
    pass: process.env.My_Password,
  },
});

// //<<-------------------------------- lOGIN WITH MOBILE OTP ------------------------------------->

// import bcrypt from "bcrypt";
// import JoiPhoneNumber from 'joi-phone-number';
// import twilio from 'twilio';
// import Joi from "joi";
// import Redis from 'ioredis';
// import { promisify } from 'util';

// const redis = new Redis(); // Initialize the Redis client

// const getAsync = promisify(redis.get).bind(redis);
// const setexAsync = promisify(redis.setex).bind(redis);

// const TWILIO_ACCOUNT_SID = 'ACd433e65ad28748b0232486c2dba8b0e9';
// const TWILIO_AUTH_TOKEN = '0c6e717bdf0519147690b5737562960c';
// const TWILIO_PHONE_NUMBER = '+15735945692';

// const joiPhoneNumber = JoiPhoneNumber(Joi);

// export const login= async (mobileno: string) => {
//   try {

//     const user = await Register.findOneAndUpdate({ mobileno }, { status: true }, { new: true });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Generate and send OTP
//     const otp = generateOTP();
//     sendOTPToMobile(mobileno, otp);

//     // For demonstration purposes, returning the OTP (in real-world, do not return the OTP)
//     return otp;
//   } catch (error) {
//     throw error;
//   }
// };

// // Function to generate OTP
// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

// // Function to send OTP using Twilio
// export const sendOTPToMobile = (toNumber: string, otp: string) => {
//   const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

//   client.messages
//     .create({
//       body: `Your OTP is: ${otp} and This OTP valid only for 5 min`,
//       from: TWILIO_PHONE_NUMBER,
//       to: `+91${toNumber}`,
//     })
//     .then((message) => console.log('OTP sent:', message.sid))
//     .catch((error) => console.error('Twilio error:', error));
// };

// export const verifyJWTToken = (token: string) => {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// };
