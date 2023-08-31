import express from 'express';
import { body } from 'express-validator';

import { newbookingservice ,Getallbookings,getbookId,deletebooking} from '../controller/Booking/Booking.controller';
import { checkUserSession, checkUserSessionfordelete } from '../middleware/checkuserlogin.validate';
import { addToCart, removeFromCart } from '../controller/Cart/cart.controller';
import { BookingValidation, deleteBookingValidation } from '../middleware/booking.validation';

const bookingRoute = express.Router();
bookingRoute.route('/').get();
bookingRoute.route('/bookingservice').post(BookingValidation,checkUserSession,newbookingservice);
bookingRoute.route('/getallbookings').get(Getallbookings);
bookingRoute.route('/getbookId').get(checkUserSession,getbookId);
bookingRoute.route('/deletebooking').delete(deleteBookingValidation,checkUserSessionfordelete,deletebooking);
// bookingRoute.route('/user/cart').post(checkUserSession,addToCart);
// bookingRoute.route('/user/removedcart/:serviceId').delete(checkUserSession,removeFromCart);

export default bookingRoute;