
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

import dotenv from 'dotenv'
import { tokenModel } from "../models/token.Model";
dotenv.config()
// const Access_JWT_SECRET = "MySecretKey";
const AccessJWTSECRET:any = process.env.Access_JWT_SECRET;
const RefreshJWTSECRET:any = process.env.Refresh_JWT_SECRET;


export const SignAccessToken =(userId: any, isAdmin: boolean) => {
    const accessTokenId=uuidv4()
    
    const payload={userId:userId,isAdmin:isAdmin,acs_jti:accessTokenId};
    const option = {expiresIn:"3hr"};
    const token = jwt.sign(payload, AccessJWTSECRET, option); // Token expires in 15 min
    console.log("Access_Token : ", token);
    return {token,accessTokenId};
  };
  
  export const SignRefreshToken = (userId: any, isAdmin: boolean) => {
    const refreshTokenId=uuidv4()
    const payload={userId:userId,isAdmin:isAdmin,ref_jti:refreshTokenId}
    const option = {expiresIn:"24hr"};
    const token =jwt.sign(payload, RefreshJWTSECRET, option);  // Token expires in 7days
    console.log("Refresh_Token : ", token);
    return {token,refreshTokenId};
  };
