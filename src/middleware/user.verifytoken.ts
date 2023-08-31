import { SignAccessToken } from './../utils/generateJWT';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const AccessJWTSECRET:any = process.env.Access_JWT_SECRET;
const RefreshJWTSECRET:any = process.env.Refresh_JWT_SECRET;

const verify_token = async (token: any) => {
  if (token) {
    const decoded = jwt.verify(token,AccessJWTSECRET);
    return decoded;
  } else {
    return { error: "Access Token is not provided" };
  }
};
const verify_refresh_token=async(token:any)=>{
  if (token) {
    const decoded = jwt.verify(token, RefreshJWTSECRET);
    return decoded;
  } else {
    return { error: "Refresh Token is not provided" };
  }
}
export { verify_token ,verify_refresh_token};
