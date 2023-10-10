"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletebooking = exports.getbookId = exports.Getallbookings = exports.newbookingservice = void 0;
const newbooking_service_1 = require("../../services/Booking/newbooking.service");
const allbooking_service_1 = require("../../services/Booking/allbooking.service");
const userbookingDetails_service_1 = require("../../services/Booking/userbookingDetails.service");
const deletebooking_service_1 = require("../../services/Booking/deletebooking.service");
const services_responses_1 = require("../../responses/services.responses");
const decodeToken_1 = require("../../utils/decodeToken");
const validationResult = require("express-validator");
/**
 *
 * @param req new booking Data
 * @param res Booking Status
 */
// Create a new booking
const newbookingservice = async (req, res) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        const decode = await (0, decodeToken_1.verifytoken)(token);
        const data = req.body;
        if (req.body.userId == decode.userId) {
            const book = await (0, newbooking_service_1.newbooking)(data);
            res.status(services_responses_1.RESPONSE_CODES.CREATED).json({ message: services_responses_1.RESPONSE_MESSAGES.BOOKING, book });
        }
    }
    catch (error) {
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: services_responses_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
exports.newbookingservice = newbookingservice;
/**
 *
 * @param req
 * @param res
 */
//Get all Booking services by user
const Getallbookings = async (req, res) => {
    try {
        const userId = req.body;
        const token = req.headers.authorization?.replace("Bearer ", "");
        const decode = await (0, decodeToken_1.verifytoken)(token);
        console.log(decode);
        const data = req.body;
        if (req.body.userId == decode.userId) {
            console.log("TRUE");
            const bookings = await (0, allbooking_service_1.bookingdetails)(userId);
            res.status(services_responses_1.RESPONSE_CODES.SUCCESS).json({ message: services_responses_1.RESPONSE_MESSAGES.BOOKING_FOUND, bookings });
        }
        else {
            res.status(services_responses_1.RESPONSE_CODES.NOTFOUND).json({ message: services_responses_1.RESPONSE_MESSAGES.NOT_FOUND });
        }
    }
    catch (error) {
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: services_responses_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
exports.Getallbookings = Getallbookings;
// Get a specific booking by ID
/**
 *
 * @param req userId,startDate,endDate
 * @param res all booking b/w these dates
 * @returns
 */
const getbookId = async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.body;
        const token = req.headers.authorization?.replace("Bearer ", "");
        console.log(token);
        const decode = await (0, decodeToken_1.verifytoken)(token);
        console.log(decode);
        const data = req.body;
        if (req.body.userId == decode.userId) {
            const booking = await (0, userbookingDetails_service_1.userbookingdetailbyID)(userId, startDate, endDate);
            return res.status(services_responses_1.RESPONSE_CODES.SUCCESS).json({ message: services_responses_1.RESPONSE_MESSAGES.BOOKING_FOUND, booking });
        }
        res.status(services_responses_1.RESPONSE_CODES.NOTFOUND).json({ message: services_responses_1.RESPONSE_MESSAGES.BOOKING_NOT_FOUND });
    }
    catch (error) {
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: services_responses_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
exports.getbookId = getbookId;
// Delete a booking
/**
 *
 * @param req bookingId
 * @param res booking delete
 */
const deletebooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const token = req.headers.authorization?.replace("Bearer ", "");
        console.log(token);
        const decode = await (0, decodeToken_1.verifytoken)(token);
        console.log(decode);
        const data = req.body;
        if (req.body.userId == decode.userId) {
            const booking = await (0, deletebooking_service_1.userbookingdelete)(bookingId);
            res.status(services_responses_1.RESPONSE_CODES.SUCCESS).json({ message: "Booking deleted successfully" });
        }
        else {
            res.status(services_responses_1.RESPONSE_CODES.BADREQUEST).json({ message: services_responses_1.RESPONSE_MESSAGES.BOOKING_NOT_FOUND });
        }
    }
    catch (error) {
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: services_responses_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
exports.deletebooking = deletebooking;
//# sourceMappingURL=Booking.controller.js.map