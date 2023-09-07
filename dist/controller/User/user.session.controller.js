"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
const sessions_schema_1 = require("../../models/sessions.schema");
class session {
    // static async maintainSession(req: Request, res: Response, user: any) {
    //   console.log(user);
    //   try {
    //     const userSession: any = await Session.findOne({ user_id: user._id });
    //     if (user) {
    //       if (!userSession) {
    //         const session_details = new Session({
    //           user_id: user.id,
    //           status: true,
    //         });
    //         const session = await session_details.save();
    //         console.log("Session stored successfully");
    //         // console.log(session);
    //       } else if (userSession) {
    //         if (!userSession.status) {
    //           await Session.findOneAndUpdate(
    //             { user_id: user.id },
    //             { status: !userSession.status }
    //           );
    //           console.log("Session Activate");
    //         }
    //       }
    //     } else {
    //       res.status(404).json({ message: "User Not Found" });
    //       console.log("User not found");
    //     }
    //   } catch (err) {
    //     res.status(500).json({ message: "Server Error", err });
    //     console.log("Server Error");
    //   }
    // }
    static async maintainSession(user) {
        try {
            const userSession = await sessions_schema_1.Session.findOne({ user_id: user._id });
            if (user) {
                if (!userSession) {
                    const session_details = new sessions_schema_1.Session({
                        user_id: user.id,
                        status: true,
                    });
                    const session = await session_details.save();
                    console.log("Session stored successfully");
                }
                else if (userSession) {
                    if (!userSession.status) {
                        await sessions_schema_1.Session.findOneAndUpdate({ user_id: user.id }, { status: !userSession.status });
                        console.log("Session Activate");
                    }
                }
            }
            else {
                return "session not stored";
            }
        }
        catch (err) {
            return { message: "Server Error", err };
        }
    }
}
exports.session = session;
//# sourceMappingURL=user.session.controller.js.map