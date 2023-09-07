"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserSessionfordelete = exports.checkUserSession = void 0;
const sessions_schema_1 = require("../models/sessions.schema"); // Import your SessionModel
const checkUserSession = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const session = await sessions_schema_1.Session.findOne({ user_id: userId });
        console.log(session?.status);
        if (session && session.status) {
            next();
        }
        else {
            res.status(401).json({ message: "User is not logged in or session is not active" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};
exports.checkUserSession = checkUserSession;
const checkUserSessionfordelete = async (req, res, next) => {
    try {
        const userId = req.user; // Assuming req.user contains user information from the token
        const session = await sessions_schema_1.Session.findOne(userId);
        if (session && session.status) {
            next();
        }
        else {
            res.status(401).json({ message: "User is not logged in or session is not active" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};
exports.checkUserSessionfordelete = checkUserSessionfordelete;
//# sourceMappingURL=checkuserlogin.validate.js.map