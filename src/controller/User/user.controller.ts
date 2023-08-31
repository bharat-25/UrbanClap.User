import bcrypt from "bcrypt";
import { Logout } from "../../services/Onboarding/user.logout.service";
import { registerUsers } from "../../services/Onboarding/user.register.service";
import { Request, Response } from "express";
import { UserData } from "../../models/user.register.schema";
import { login,sendEmail,verifyOTP,} from "../../services/Onboarding/user.login.service";
import { error } from "console";
import {mobileLoginSchema,otpVerificationValidatrion,loginValidation,} from "../../middleware/user.datavalidate";
import client from "../../utils/redis";
import { Session } from "../../models/sessions.schema";
import { session } from "./user.session.controller";
import { verify_refresh_token, verify_token } from "../../middleware/user.verifytoken";
import { SignAccessToken, SignRefreshToken } from "../../utils/generateJWT";

//<----------------------------------------- SIGNUP ------------------------------------------------->

export const registerControl = async (req: Request, res: Response) => {
  try {
    if (req.body == undefined) {
      res.status(400).json({ Message: "Bad Request" });
    } else
     {

      let result = await isUserExist(req);
      if (!result) {

        const userData = req.body;

        const newUser = await registerUsers(userData);

        res.status(201).json({ message: "User registered successfully", user: newUser });

      } else {

        res.status(409).json({ message: "user Already Exist!, Pls enter the valid Email Id"});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
const isUserExist = async (req: Request) => {
  // let data: any;
  try {
    // data=await Register.findOne({mobileno:req.body.mobileno});
    const data = await UserData.findOne({ email: req.body.email });

    return data;
  } catch {
    console.error("error occured", error);
  }
};

//<------------------------------------ LOGIN WITH Mail OTP ---------------------------------------------------->

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // const { error } = mobileLoginSchema.validate(req.body);
    const { error } = loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const user: any = await UserData.findOne({ email: req.body.email });
    console.log(user?.password);
    console.log(password);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const pass = await bcrypt.compare(password.toString(), user?.password);
    console.log(pass);

    if (!pass) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    const isSession: any = await Session.findOne({ user_id: user._id });

    if (isSession) {
      if (isSession.status) {
        return res.status(400).json({ message: "User is already logged in" });
      }
    }
    const otp = await login(email);

    console.log(email, otp);

    client.set(email, otp, { EX: 300 });

    const result = sendEmail(email, otp);

    const sess = await session.maintainSession(req, res, user);

    res.status(200).json({ message: "OTP sent successfully and OTP valid only for 5 min" });

    // -----------CODE FOR SEND OTP TO MOBILE NO-------------

    // const otp = await login(mobileno);

    // await storeOTPInRedis(mobileno, otp);
    // // send OTP to client's phone number using Twilio API
    // sendOTPToMobile(mobileno, otp);

    //--------CODE FOR SEND OTP TO EMAIL-----
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

//<----------------------------- VERIFY OTP with MOBILE NO------------------------------------------------------>

// export const verifyOTPController = async (req: Request, res: Response) => {

//     try {
//       const { error } = otpVerificationSchema.validate(req.body);

//       const userId=req.body.email;

//       if (error) {
//         return res.status(400).json({ message: 'Invalid data', error: error.details });
//       }

//       const { email,mobileno, otp } = req.body;

//       const isValidOTP = await verifyOTP(otp, mobileno,email);

//       if (!isValidOTP) {
//         return res.status(401).json({ message: 'Invalid OTP' });
//       }
//       // await setUserLoginStatus(userId, true);
//       const jwtToken = generateJWTToken(userId);

// await redisClient.set(`session:${}`, 'true');

//       res.status(200).json({ message: 'Successfully login' ,token: jwtToken});
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'An error occurred' });
//     }
//   };

//<------------------------------------------ VERIFY OTP WITH EMAIL-----------------------------------------------------

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const { error } = otpVerificationValidatrion.validate(req.body);

    const userId = req.body.email;

    if (error) {
      return res.status(400).json({ message: "Invalid data", error: error.details });
    }
    const isadmin: any = await UserData.findOne(
      { email: userId },
      { isAdmin: 1 }
    );
    // console.log('1111111111111111111111111111111111111',isadmin?.isAdmin)
    // console.log("111111111111111111111111111111111111", isadmin);

    const { email, otp } = req.body;

    const isValidOTP = await verifyOTP(otp, email);

    if (!isValidOTP) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const AccessToken = SignAccessToken(userId, isadmin);
    const RefreshToken = SignRefreshToken(userId, isadmin);

    res.status(200).json({ message: "Successfully login", Access_token: AccessToken ,Refresh_token:RefreshToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

//<--------------------------------------------- LOGOUT ----------------------------------------->

export const logoutcontrol = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userToken = await verify_token(token);

    const result = await Logout.logout_user(userToken);
    res.status(200).json({ message: "Successfully logout", result });

  } catch (err) {
    res.status(500).json({ message: "Server Error, Token Expired!" });
  }
};

export const NewTokens= async(req: Request, res: Response)=>{
  try{
    const refresh_token=req.body;
    if (!refresh_token) {
      return res.status(401).json({ message: "Bad Request, JWT expired!" });
    }
    const userId:any= await verify_refresh_token(refresh_token)
    const isadmin:any= await verify_refresh_token(refresh_token)

    const AccessToken = SignAccessToken(userId, isadmin);
    const RefreshToken = SignRefreshToken(userId, isadmin);

    res.status(200).json({ Access_token: AccessToken ,Refresh_token:RefreshToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}