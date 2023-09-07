import { CartValidation} from './../middleware/booking.validation';
import express from 'express';
import { body } from 'express-validator';

import { newbookingservice ,Getallbookings,getbookId,deletebooking} from '../controller/Booking/Booking.controller';
import { checkUserSession, checkUserSessionfordelete } from '../middleware/checkuserlogin.validate';
import { addToCart, removeFromCart } from '../controller/Cart/cart.controller';
import { BookingValidation, deleteBookingValidation } from '../middleware/booking.validation';

const bookingRoute = express.Router();
bookingRoute.route('/').get();
bookingRoute.route('/bookingservice').post(BookingValidation,newbookingservice);
bookingRoute.route('/getallbookings').post(checkUserSession,Getallbookings);
bookingRoute.route('/getbookId').post(checkUserSession,getbookId);
bookingRoute.route('/deletebooking').delete(deleteBookingValidation,checkUserSession,deletebooking);
bookingRoute.route('/user/cart').post(CartValidation,checkUserSession,addToCart);
bookingRoute.route('/user/removedcart').delete(CartValidation,checkUserSession,removeFromCart);

export default bookingRoute;