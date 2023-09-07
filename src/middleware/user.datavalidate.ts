// import { verifyRefreshTokenSchema } from './user.datavalidate';
import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

const registerValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  mobileno: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  isAdmin: Joi.boolean(),
  addresses: Joi.array().items(
    Joi.object({
      addressType: Joi.string().valid("home", "work", "other").required(),
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      postalCode: Joi.string(),
    })
  ),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

export const mobileLoginSchema = Joi.object({
  mobileno: Joi.string().required(),
});

export const otpVerificationValidatrion = Joi.object({
  email: Joi.string().required(),
  otp: Joi.string().required(),
});


export const verifyTokenSchema = Joi.object({
  token: Joi.string().required(),
});
export const logout_Schema = Joi.object({
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
export const registerUserMiddleware = validatedata(registerValidation);
export const loginUserMiddleware = validatedata(loginValidation);
export const OTPValidationMiddleware = validatedata(otpVerificationValidatrion);
export const VerifyAccessToken = validatedata(verifyTokenSchema);
export const logout_schema = validatedata(logout_Schema);

