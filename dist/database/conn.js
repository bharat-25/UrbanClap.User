"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    try {
        await mongoose_1.default.connect("mongodb://localhost:27017/UrbanClap");
        mongoose_1.default.set({ debug: true });
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};
exports.dbConnect = dbConnect;
//# sourceMappingURL=conn.js.map