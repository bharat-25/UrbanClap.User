
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
// const Access_JWT_SECRET = "MySecretKey";
const AccessJWTSECRET:any = process.env.Access_JWT_SECRET;
const RefreshJWTSECRET:any = process.env.Refresh_JWT_SECRET;


export const SignAccessToken = (userId: string, isAdmin: boolean) => {
    // id: user.id, type: user.type
    const payload={userId,isAdmin}
    const time="5m"
    const token = jwt.sign(payload, AccessJWTSECRET, {expiresIn: time,}); // Token expires in 15 min
    console.log("Access_Token : ", token);
    return token;
  };

export const SignRefreshToken = (userId: string, isAdmin: boolean) => {
    // id: user.id, type: user.type
    const payload={userId,isAdmin}
    const time="7d"
    const token =jwt.sign(payload, RefreshJWTSECRET, {expiresIn: time,});  // Token expires in 7days
    console.log("Refresh_Token : ", token);
    return token;
  };