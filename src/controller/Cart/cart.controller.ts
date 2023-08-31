// cartController.ts
import { Request, Response } from 'express';
// import UserModel from './models/user'; // Import your UserModel
import { UserData } from "../../models/user.register.schema";
import { addCart } from '../../services/Cart/cart.service';
import { removeCart } from '../../services/Cart/remove.cart.service';

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user; // Assuming req.user contains user information from the token
    const { serviceId } = req.body;

    const newcart= await addCart(userId,serviceId)

    res.status(201).json({ message: 'Service added to cart successfully',newcart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


export const removeFromCart = async (req: Request, res: Response) => {
    try {
      const { userId } = req.user; // Assuming req.user contains user information from the token
      const { serviceId } = req.params;
  
      const del_cart= await removeCart(userId,serviceId)
  
      res.status(200).json({ message: 'Service removed from cart successfully',del_cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };