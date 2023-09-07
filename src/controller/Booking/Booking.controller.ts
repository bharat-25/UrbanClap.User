import { Request, Response } from "express";
import { newbooking } from "../../services/Booking/newbooking.service";
import { bookingdetails } from "../../services/Booking/allbooking.service";
import { userbookingdetailbyID } from "../../services/Booking/userbookingDetails.service";
import { userbookingdelete } from "../../services/Booking/deletebooking.service";
import {
  RESPONSE_MESSAGES,
  RESPONSE_CODES,
} from "../../responses/services.responses";
import { logger } from "../../middleware/logger.validate";
import { verify_token, verifytoken } from "../../utils/decodeToken";
const validationResult = require("express-validator");

/**
 *
 * @param req new booking Data
 * @param res Booking Status
 */
// Create a new booking
export const newbookingservice = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log(token);
    const decode: any = await verifytoken(token);
    console.log(decode);
    const data = req.body;
    if (req.body.userId == decode.userId) {
      const book = await newbooking(data);
      
      res.status(RESPONSE_CODES.CREATED).json({ message: RESPONSE_MESSAGES.BOOKING, book });
    }
  } catch (error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

/**
 *
 * @param req
 * @param res
 */

//Get all Booking services by user
export const Getallbookings = async (req: Request, res: Response) => {
  try {
    const userId = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");

    const decode: any = await verifytoken(token);
    console.log(decode);
    const data = req.body;
    if (req.body.userId == decode.userId) {
      console.log("TRUE");
      const bookings = await bookingdetails(userId);
      res.status(RESPONSE_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.BOOKING_FOUND, bookings });
    } else {
      res.status(RESPONSE_CODES.NOTFOUND).json({ message: RESPONSE_MESSAGES.NOT_FOUND });
    }
  } catch (error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// Get a specific booking by ID
export const getbookId = async (req: Request, res: Response) => {
  try {

    const { userId, startDate, endDate } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log(token);
    const decode: any = await verifytoken(token);
    console.log(decode);
    const data = req.body;
    if (req.body.userId == decode.userId) {
      const booking = await userbookingdetailbyID(userId, startDate, endDate);
      return res.status(RESPONSE_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.BOOKING_FOUND, booking });
    }
    res.status(RESPONSE_CODES.NOTFOUND).json({ message: RESPONSE_MESSAGES.BOOKING_NOT_FOUND });
  } catch (error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// Delete a booking
export const deletebooking = async (req: Request, res: Response) => {
  try {
    const { bookingId, userId } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log(token);
    const decode: any = await verifytoken(token);
    console.log(decode);
    const data = req.body;
    if (req.body.userId == decode.userId) {
      const booking: any = await userbookingdelete(bookingId);
      res.status(RESPONSE_CODES.SUCCESS).json({ message: "Booking deleted successfully" });
    } else {
      res.status(RESPONSE_CODES.BADREQUEST).json({ message: RESPONSE_MESSAGES.BOOKING_NOT_FOUND });
    }
  } catch (error) {
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
