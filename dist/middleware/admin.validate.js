"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminvalid = void 0;
const adminvalid = async (req, res, next) => {
    try {
        const checkAdmin = req.body.isAdmin;
        if (!checkAdmin) {
            return res.status(403).json({ error: "Access Denied" });
        }
        next();
    }
    catch (err) {
        res.status(403).json({ error: "Unauthorized" });
    }
};
exports.adminvalid = adminvalid;
//# sourceMappingURL=admin.validate.js.map