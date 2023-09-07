import { cartModel } from "../../models/BookingModel/cart.model";
import { UserData } from "../../models/user.register.schema";

export const removeCart = async (userid: any, packageId: any) => {
  try {
    const userId = userid;
    const packageIdToRemove = packageId;

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return { message: "Cart not found" };
    }

    const updatedCart = await cartModel.findOneAndDelete(
      { userId },
      { $pull: { services: { serviceId: packageIdToRemove } } }
    );

    return { message: "Service removed from cart successfully" };
  } catch (error) {
    throw new Error("Error fetching salon services");
  }
};

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
