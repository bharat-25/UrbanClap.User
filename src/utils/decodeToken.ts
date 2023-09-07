import { SignAccessToken } from "./../utils/generateJWT";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { decode } from "punycode";
dotenv.config();

const AccessJWTSECRET: any = process.env.Access_JWT_SECRET;
const RefreshJWTSECRET: any = process.env.Refresh_JWT_SECRET;

const verify_token = async (token: any) => {
  if (token) {
    const decoded = jwt.verify(token, AccessJWTSECRET);
    return decoded;
  } else {
    return { error: "Access Token is not provided" };
  }
};
const verify_refresh_token = async (token: any) => {
  if (token) {
    const decoded = jwt.verify(token, RefreshJWTSECRET);
    return decoded;
  } else {
    return { error: "Refresh Token is not provided" };
  }
};

const verifytoken = async (token: any) => {
  if (token) {
    const decoded = jwt.verify(token, AccessJWTSECRET);
    if(!decoded){
    return "Invalid token"
    }
    return decoded;
  } else {
    return { error: "Access Token is not provided" };
  }
};

export { verify_token, verifytoken,verify_refresh_token };
