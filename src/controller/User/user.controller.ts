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
import { verify_refresh_token, verify_token } from "../../utils/decodeToken";
import { SignAccessToken, SignRefreshToken } from "../../utils/generateJWT";
import {RESPONSE_MESSAGES,RESPONSE_CODES,} from '../../responses/services.responses';
import { v4 as uuidv4 } from 'uuid';
import { tokenModel } from "../../models/token.Model";
import { logger } from "../../middleware/logger.validate";

//<----------------------------------------- SIGNUP ------------------------------------------------->

export const registerControl = async (req: Request, res: Response) => {
  try {
      let result = await isUserExist(req);
      if (!result) {
        const userData = req.body;

        const newUser = await registerUsers(userData);

        res.status(RESPONSE_CODES.CREATED).json({ message: RESPONSE_MESSAGES.CREADTED, user: newUser });
      } else {
        res.status(RESPONSE_CODES.CONFLICT).json({ message: RESPONSE_MESSAGES.ALREADY_EXIST });
      }
  } catch (error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
const isUserExist = async (req: Request) => {
  try {
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

    const user: any = await UserData.findOne({ email: req.body.email});

    if (!user) {
      return res.status(RESPONSE_CODES.NOTFOUND).json({ error: RESPONSE_MESSAGES.NOT_FOUND });
    }

    const pass = await bcrypt.compare(password.toString(), user?.password);

    if (!pass) {
      return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: "Wrong Password" });
    }

    const isSession: any = await Session.findOne({ user_id: user._id });

    if (isSession) {
      if (!isSession.status) {
        return res.status(RESPONSE_CODES.BADREQUEST).json({ message: "User is already logged in" });
      }
    }
    logger.info(isSession)
    const otp = await login(email);

    console.log(email, otp);

    client.set(email, otp, { EX: 300 });

    const result = sendEmail(email, otp);

    const sess = await session.maintainSession(user);

    res.status(RESPONSE_CODES.SUCCESS).json({ message: "OTP sent successfully and OTP valid only for 5 min" })
  } 
  catch (error) {
    console.error(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
  }
};


//<------------------------------------------ VERIFY OTP WITH EMAIL-----------------------------------------------------
  
export const verifyOTPController = async (req: Request, res: Response) => {
    try {
    // const { error } = otpVerificationValidatrion.validate(req.body);

    const userId = req.body.email;
    
    // if (error) {
    //   return res.status(RESPONSE_CODES.BADREQUEST).json({ message: "Invalid data", error: error.details });
    // }
    const user_data: any = await UserData.findOne({ email: userId });
    console.log(user_data)
    
    const { email, otp } = req.body;
    
    const isValidOTP = await verifyOTP(otp, email);
    
    if (!isValidOTP) {
      return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ message: RESPONSE_MESSAGES.UNAUTHORIZED });
    }
    client.set(`status:${userId}`, 'true');

    const isSession: any = await Session.findOne({ user_id: user_data._id });

    if (isSession) {
      if (isSession.status==false) {
        const sess = await session.maintainSession(user_data);
      }
    }

    const AccessToken = SignAccessToken(user_data._id, user_data.isAdmin);
    const RefreshToken = SignRefreshToken(user_data._id, user_data.isAdmin);
    
    await tokenModel.create({userId:user_data._id,accessTokenId:AccessToken.accessTokenId,refreshTokenId:RefreshToken.refreshTokenId})

    res.status(RESPONSE_CODES.SUCCESS).json({ message: "Successfully login", Access_token: AccessToken ,Refresh_token:RefreshToken});
  } catch (error) {
    console.error(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
  }
};

//<--------------------------------------------- LOGOUT ----------------------------------------->

export const logoutcontrol = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ','');
    console.log(token)
    const userToken:any = await verify_token(token);
    const result = await Logout.logout_user(userToken);
    if(result){
      res.status(RESPONSE_CODES.SUCCESS).json({ message: "Successfully logout", result });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error, Token Expired!" });
  }
};

//<---------------------------------------------New Token--------------------------------------------------->

export const NewTokens= async(req: Request, res: Response)=>{
  try{
    const refresh_token = req.headers.authorization?.replace('Bearer ','');
    if (!refresh_token) {
      return res.status(401).json({ message: "Bad Request, JWT expired!" });
    }
    const userId:any= await verify_refresh_token(refresh_token)
    const isadmin:any= await verify_refresh_token(refresh_token)

    const AccessToken = SignAccessToken(userId, isadmin);
    // const RefreshToken = SignRefreshToken(userId, isadmin);

    res.status(RESPONSE_CODES.SUCCESS).json({ Access_token: AccessToken });
    // res.status(200).json({ Access_token: AccessToken ,Refresh_token:RefreshToken});
  } catch (error) {
    console.error(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
  }
}
    //<----------------------------- VERIFY OTP with MOBILE NO------------------------------------------------------>
    
    // export const verifyOTPController = async (req: Request, res: Response) => {
    
    //     try {
    //       const { error } = otpVerificationSchema.validate(req.body);
    
    //       const userId=req.body.email;
    
    //       if (error) {
    //         return res.status(RESPONSE_CODES.BADREQUEST).json({ message: 'Invalid data', error: error.details });
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
