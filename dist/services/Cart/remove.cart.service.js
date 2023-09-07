"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCart = void 0;
const cart_model_1 = require("../../models/BookingModel/cart.model");
const removeCart = async (userid, packageId) => {
    try {
        const userId = userid;
        const packageIdToRemove = packageId;
        const cart = await cart_model_1.cartModel.findOne({ userId });
        if (!cart) {
            return { message: "Cart not found" };
        }
        const updatedCart = await cart_model_1.cartModel.findOneAndDelete({ userId }, { $pull: { services: { serviceId: packageIdToRemove } } });
        return { message: "Service removed from cart successfully" };
    }
    catch (error) {
        throw new Error("Error fetching salon services");
    }
};
exports.removeCart = removeCart;
// export const removeCart = async (userid: any, serviceId: any) => {
//   try {
//     const user = await UserData.findById(userid);
//     if (!user) {
//       return ( 'User not found');
//     }
//     user.cart = user.cart.filter(cartItem => cartItem.serviceId !== serviceId);
//     const removedcart= await user.save();
//     return removedcart;
//   } catch (error) {
//     throw new Error("Error fetching salon services");
//   }
// };
//# sourceMappingURL=remove.cart.service.js.map