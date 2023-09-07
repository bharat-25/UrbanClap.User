import { Request, Response, NextFunction } from "express";
import { Session } from "../models/sessions.schema"; // Import your SessionModel

export const checkUserSession = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const userId = req.body.userId;

    const session = await Session.findOne({ user_id: userId });

    console.log(session?.status);

    if (session && session.status) {
      next();
    } else {
      res.status(401).json({ message: "User is not logged in or session is not active" });
    }
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const checkUserSessionfordelete = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const userId = req.user; // Assuming req.user contains user information from the token
    const session = await Session.findOne(userId);

    if (session && session.status) {
      next();
    } else {
      res.status(401).json({ message: "User is not logged in or session is not active" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
