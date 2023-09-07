"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCart = void 0;
const user_register_schema_1 = require("../../models/user.register.schema");
const cart_model_1 = require("../../models/BookingModel/cart.model");
const addCart = async (userId, packageId) => {
    try {
        const user = await user_register_schema_1.UserData.findById({ _id: userId });
        if (!user) {
            return ('User not found');
        }
        const cart = new cart_model_1.cartModel({
            userId,
            packageId,
        });
        const addedcart = await cart.save();
        return addedcart;
    }
    catch (error) {
        throw new Error("Error to add services in cart");
    }
};
exports.addCart = addCart;
//# sourceMappingURL=cart.service.js.map