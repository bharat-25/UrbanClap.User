import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
// import { verifyJWTToken } from '../services/user.login.service';
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


const AccessJWTSECRET:any = process.env.Access_JWT_SECRET;
const RefreshJWTSECRET:any = process.env.Refresh_JWT_SECRET;

const authenticateToken = async (req: Request, res: Response, next: any) => {
  let token: any = req.headers["authorization"];
  token = token.slice(7, token.length);

  if (token == null) {
    res.status(401).send("unauthorized user to access.");
  }
  try {
    const decoded:any = jwt.verify(token, AccessJWTSECRET);
    if(req.user = decoded.userId){
      console.log(decoded);
      next();
    }
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export { authenticateToken };

