// cartController.ts
import { Request, Response } from "express";
import { addCart } from "../../services/Cart/cart.service";
import { removeCart } from "../../services/Cart/remove.cart.service";
import {RESPONSE_MESSAGES,RESPONSE_CODES,} from "../../responses/services.responses";
import { verifytoken } from "../../utils/decodeToken";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, packageId } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decode: any = await verifytoken(token);
    if (req.body.userId == decode?.userId) {
      const newcart = await addCart(userId, packageId);
      res.status(RESPONSE_CODES.CREATED).json({ message: RESPONSE_MESSAGES.SERVICE_ADDED, newcart });
    } else {
      res.status(RESPONSE_CODES.BADREQUEST).json({ message: RESPONSE_MESSAGES.BAD_REQUEST });
    }
  } catch (error) {
    console.error(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, packageId } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decode: any = await verifytoken(token);
    if (req.body.userId == decode?.userId) {
      const del_cart = await removeCart(userId, packageId);
      res.status(RESPONSE_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.SERVICE_DELETE, del_cart });
    } else {
      return res.status(RESPONSE_CODES.BADREQUEST).json({ message: RESPONSE_MESSAGES.BAD_REQUEST });
    }
  } catch (error) {
    console.error(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR});
  }
};
