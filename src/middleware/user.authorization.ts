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

const authenticateToken = async (req: Request, res: Response, next: any) => {
  let token: any = req.headers["authorization"];
  token = token.slice(7, token.length);

  // console.log(token);

  if (token == null) {
    res.status(401).send("unauthorized user to access.");
  }
  try {
    // console.log(token);

    const decoded = jwt.verify(token, "MySecretKey");
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export { authenticateToken };
