
import { Session } from "../../models/sessions.schema";
import { Request, Response } from "express";
import { UserData } from "../../models/user.register.schema";

export class session {
  static async maintainSession(req: Request, res: Response, user: any) {
    console.log(user);
    try {
      const userSession: any = await Session.findOne({ user_id: user._id });
      console.log(userSession, "-------------------11");
      console.log(user, "-------------------12");

      if (user) {
        if (!userSession) {
          const session_details = new Session({
            user_id: user.id,
            status: true,
          });
          const session = await session_details.save();
          console.log("Session stored successfully");
          console.log(session);
        } else if (userSession) {
          if (!userSession.status) {
            await Session.findOneAndUpdate(
              { user_id: user.id },
              { status: !userSession.status }
            );
            console.log("Session Activate");
          }
        }
      } else {
        res.status(404).json({ message: "User Not Found" });
        console.log("User not found");
      }
    } catch (err) {
      res.status(500).json({ message: "Server Error", err });
      console.log("Server Error");
    }
  }
}
