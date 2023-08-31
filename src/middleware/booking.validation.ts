import { timeStamp } from "console";
import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

const BookingValid = Joi.object({
  serviceId: Joi.string(),
  userId: Joi.string(),
  date: Joi.date(),
  time: Joi.string(),
});

export const deleteValidatrion = Joi.object({
  bookingId: Joi.string().required(),
  userId: Joi.string().required(),
});
const validatedata = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    req.body = value;
    next();
  };
};
export const BookingValidation = validatedata(BookingValid);
export const deleteBookingValidation = validatedata(deleteValidatrion);