import { Request, Response } from "express";

export const adminvalid = async (req: Request, res: Response, next: any) => {
  try {
    const checkAdmin = req.body.isAdmin;
    if (!checkAdmin) {
      return res.status(403).json({ error: "Access Denied" });
    }
    next();
  } catch (err) {
    res.status(403).json({ error: "Unauthorized" });
  }
};
