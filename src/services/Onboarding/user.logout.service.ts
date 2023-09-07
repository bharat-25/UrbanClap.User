import { any } from "joi";
// import { verify_token } from "../../middleware/user.verifytoken";
import { Session } from "../../models/sessions.schema";
import { UserData } from "../../models/user.register.schema";
import redis from "../../utils/redis";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { tokenModel } from "../../models/token.Model";
dotenv.config();

// const AccessJWTSECRET:any = process.env.Access_JWT_SECRET;
// const RefreshJWTSECRET:any = process.env.Refresh_JWT_SECRET;

export class Logout{
    static async logout_user(userToken:any){
        try{
            const userr:any = await UserData.findOne({_id: userToken.userId });
            if(userr){
                const id = userr._id;
                
                const userSession:any = await Session.findOne({user_id: id});
                if(userr){
                    if(userSession.status){
                        const updatedUserSession = await Session.findOneAndUpdate({_id: userSession.id}, {status: !userSession.status});
                        
                        const jti_session=await tokenModel.findOneAndDelete({userId:id})
                        console.log(updatedUserSession,jti_session);
                        return true;
                    }
                    else{
                        return({message:"User is already inactive"});
                    }
                }
                else{
                    return ({message: "Session not found"}); 
                }
            }
            else{
                return false;
            }

        }
        catch(err){
            return false;
        }
    }
    
}


