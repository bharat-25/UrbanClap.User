import { NextFunction, Request, Response } from "express";
import {verifytoken,} from "../utils/decodeToken";
import { RESPONSE_CODES } from "../responses/services.responses";

export const checkadmin = async (req: any,res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const userToken: any = await verifytoken(token);
    const checkAdmin = userToken.isAdmin;

    if (checkAdmin == true) {
      return res.status(RESPONSE_CODES.SUCCESS).json({ message: "Authorized User: Admin Access " });
    }
    return res.status(404).json({ message: "Access Denied!, You are not Admin" });
  } catch (err) {
    res.send("Unauthorized");
  }
};
