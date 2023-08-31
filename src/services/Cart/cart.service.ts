import { UserData } from "../../models/user.register.schema";

export const addCart = async (userid: any, bookingid: any) => {
  try {
    const user = await UserData.findById({_id:userid});

    if (!user) {
      return ( 'User not found');
    }

    // Add the service to the user's cart
    user.cart.push({ bookingid,userid });
    const addedcart=await user.save();
    return addedcart;
  } catch (error) {
    throw new Error("Error fetching salon services");
  }
};
