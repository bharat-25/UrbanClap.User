import { timeStamp } from "console";
import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

const BookingValid = Joi.object({
  userId: Joi.string(),
  packageId: Joi.string(),
  slotdate: Joi.date(),
  slotTime: Joi.string(),
});

export const deleteValidatrion = Joi.object({
  bookingId: Joi.string().required(),
  userId: Joi.string().required(),
});

export const cartValidatrion = Joi.object({
  userId: Joi.string().required(),
  packageId: Joi.string().required(),
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
export const CartValidation = validatedata(cartValidatrion);
