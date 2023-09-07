import { UserData } from "../../models/user.register.schema";
import { cartModel } from "../../models/BookingModel/cart.model";

export const addCart = async (userId: any, packageId: any) => {
  try {
    const user = await UserData.findById({_id:userId});

    if (!user) {
      return ( 'User not found');
    }
    const cart = new cartModel({
      userId,
      packageId,
    });
    const addedcart=await cart.save();
    return addedcart;
  } catch (error) {
    throw new Error("Error to add services in cart");
  }
};
