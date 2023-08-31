import { any } from "joi";
import { verify_token } from "../../middleware/user.verifytoken";
import { Session } from "../../models/sessions.schema";
import { UserData } from "../../models/user.register.schema";
import redis from "../../utils/redis";

export class Logout{
    static async logout_user(userToken:any){
        console.log("h890puiopuiopuiopytcfuvguhb",userToken)
        try{
            const user = await UserData.findOne({email: userToken.userId });
            console.log(user)
            if(user){
                const id = user.id;
                
                const userSession:any = await Session.findOne({user_id: id});
                console.log(userSession);
                if(user){
                    if(userSession.status){
                        // await redis.logout_session_redis(redisClient,user);
                        const updatedUserSession = await Session.findOneAndUpdate({_id: userSession.id}, {status: !userSession.status});
                        console.log(updatedUserSession);
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