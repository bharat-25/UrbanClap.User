import { UserData } from "../../models/user.register.schema";

export const removeCart = async (userid: any, serviceId: any) => {
  try {
    const user = await UserData.findById(userid);

    if (!user) {
      return ( 'User not found');
    }

    // Add the service to the user's cart
    user.cart = user.cart.filter(cartItem => cartItem.serviceId !== serviceId);
    const removedcart= await user.save();
    return removedcart;
  } catch (error) {
    throw new Error("Error fetching salon services");
  }
};
