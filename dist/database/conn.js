"use strict";
// import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
// const dbConnect = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/UrbanClap");
//     mongoose.set({ debug: true });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB", error);
//   }
// };
// export { dbConnect };
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const url =process.env.DB_CONNECTION_URL;
const dbConnect = async () => {
    try {
        console.log(process.env.DB_CONNECTION_URL);
        await mongoose_1.default.connect(`${process.env.DB_CONNECTION_URL}`);
        mongoose_1.default.set({ debug: true });
        console.log({ message: `Succesfully connected to the db` });
    }
    catch (e) {
        console.log({ level: "error", message: "ERRRRRR" });
    }
};
exports.dbConnect = dbConnect;
//# sourceMappingURL=conn.js.map