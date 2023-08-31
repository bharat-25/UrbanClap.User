import { Request, Response } from "express";
import { BookingModel } from "../../models/BookingModel/booking.schema";
import { newbooking } from "../../services/Booking/newbooking.service";
import { bookingdetails } from "../../services/Booking/allbooking.service";
import { userbookingdetailbyID } from "../../services/Booking/userbookingDetails.service";
import { userbookingdelete } from "../../services/Booking/deletebooking.service";
import { UserData } from "../../models/user.register.schema";
import {
  RESPONSE_MESSAGES,
  RESPONSE_CODES,
} from '../../responses/services.responses';
const  validationResult  = require('express-validator');

// Create a new booking
export const newbookingservice = async (req: Request, res: Response) => {

    try {
        const data=req.body;
        const book= await newbooking(data)
    
        res.status(RESPONSE_CODES.CREATED).json({ message: RESPONSE_MESSAGES.CREADTED,book });
      } catch (error) {
        console.error(error);
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_CODES.INTERNAL_SERVER_ERROR});
      }
}

//Get all Booking services by user
export const Getallbookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const bookings = await bookingdetails(userId);
    res.status(RESPONSE_CODES.CREATED).json({ message:RESPONSE_MESSAGES.BOOKING, bookings });
  } catch (error) {
    console.error(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// Get a specific booking by ID
export const getbookId = async (req: Request, res: Response) => {
  try {
    // const  userId  = req.user;
    // const startDate  = req.query.startDate||2022-01-01;
    // const endDate  = req.query.endDate||2023-12-31;

    const {userId,startDate, endDate}=req.body
    const booking = await userbookingdetailbyID(userId, startDate, endDate);
    if (!booking) {
      return res.status(RESPONSE_CODES.NOTFOUND).json({ message: RESPONSE_MESSAGES.BOOKING_NOT_FOUND });
    }
    res.status(RESPONSE_CODES.SUCCESS).json({message:RESPONSE_MESSAGES.BOOKING_FOUND});
  } catch (error) {
    console.error(error);
    res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// Delete a booking
export const deletebooking = async (req: Request, res: Response) => {
  try {
    const { bookingId, userId } = req.body;
  
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('ILOVEINDIA',req.body);
    
    const booking = await userbookingdelete( bookingId );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
