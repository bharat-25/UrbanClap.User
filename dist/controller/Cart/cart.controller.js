"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.addToCart = void 0;
const cart_service_1 = require("../../services/Cart/cart.service");
const remove_cart_service_1 = require("../../services/Cart/remove.cart.service");
const services_responses_1 = require("../../responses/services.responses");
const decodeToken_1 = require("../../utils/decodeToken");
const addToCart = async (req, res) => {
    try {
        const { userId, packageId } = req.body;
        const token = req.headers.authorization?.replace("Bearer ", "");
        const decode = await (0, decodeToken_1.verifytoken)(token);
        if (req.body.userId == decode?.userId) {
            const newcart = await (0, cart_service_1.addCart)(userId, packageId);
            res.status(services_responses_1.RESPONSE_CODES.CREATED).json({ message: services_responses_1.RESPONSE_MESSAGES.SERVICE_ADDED, newcart });
        }
        else {
            res.status(services_responses_1.RESPONSE_CODES.BADREQUEST).json({ message: services_responses_1.RESPONSE_MESSAGES.BAD_REQUEST });
        }
    }
    catch (error) {
        console.error(error);
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: services_responses_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
exports.addToCart = addToCart;
const removeFromCart = async (req, res) => {
    try {
        const { userId, packageId } = req.body;
        const token = req.headers.authorization?.replace("Bearer ", "");
        const decode = await (0, decodeToken_1.verifytoken)(token);
        if (req.body.userId == decode?.userId) {
            const del_cart = await (0, remove_cart_service_1.removeCart)(userId, packageId);
            res.status(services_responses_1.RESPONSE_CODES.SUCCESS).json({ message: services_responses_1.RESPONSE_MESSAGES.SERVICE_DELETE, del_cart });
        }
        else {
            return res.status(services_responses_1.RESPONSE_CODES.BADREQUEST).json({ message: services_responses_1.RESPONSE_MESSAGES.BAD_REQUEST });
        }
    }
    catch (error) {
        console.error(error);
        res.status(services_responses_1.RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: services_responses_1.RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
exports.removeFromCart = removeFromCart;
//# sourceMappingURL=cart.controller.js.map