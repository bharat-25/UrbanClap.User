import { NextFunction, Request, Response } from "express";
import { verify_token } from "../middleware/user.verifytoken";
import Jwt  from "jsonwebtoken";
// export const checkadmin = async (req: Request, res: Response) => {
//   try {
//     const token = req.headers.authorization;

//     const userToken: any = await verify_token(token);

//     const checkAdmin = userToken.isAdmin;

//     console.log(checkAdmin);
    
//     if (!checkAdmin) {
//       return res.status(403).json({ error: "Access Denied" });
//     }
//     res.status(200).json("Authorized User: Admin");
//   } catch (err) {
//     res.status(403).json({ error: "Unauthorized" });
//   }
// };


export const checkadmin = async (req: any, res: { send: (arg0: any) => void; },next:NextFunction) => {
    try {
        const token = req.headers.authorization;

      
        console.log(":,,,,,,,,,,,,,,,,,,,,,,,,,",token)
      const userToken: any = await verify_token(token);
      const qqq:any=Jwt.decode(userToken)
      const checkAdmin = qqq.isAdmin;
  
      if (!checkAdmin) {
        return res.send( "Access Denied" );
      }
      next();
      res.send("Authorized User: Admin");
    } catch (err) {
      res.send(  "Unauthorized" );
    }
  };