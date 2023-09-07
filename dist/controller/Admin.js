"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkadmin = void 0;
const decodeToken_1 = require("../utils/decodeToken");
const checkadmin = async (req, res) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        const userToken = await (0, decodeToken_1.verifytoken)(token);
        const checkAdmin = userToken.isAdmin;
        if (checkAdmin == true) {
            return res.status(200).json({ message: "Authorized User: Admin Access " });
        }
        return res.status(404).json({ message: "Access Denied!, You are not Admin" });
    }
    catch (err) {
        res.send("Unauthorized");
    }
};
exports.checkadmin = checkadmin;
//# sourceMappingURL=Admin.js.map