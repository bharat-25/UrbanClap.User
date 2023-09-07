import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { UserData } from "../../models/user.register.schema";

export const registerUsers = async (userData:any) => {
    try {
        const { name, email, password, mobileno,isAdmin, addresses } = userData;
        const encryptPass = await bcrypt.hash(password, 5);
      
        const registerdata = new UserData({name,email,password: encryptPass,mobileno,isAdmin,addresses, });
        await registerdata.save();
        return registerdata;
    }
    catch (err) {
        return false;
    }
}