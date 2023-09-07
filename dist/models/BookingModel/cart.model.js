"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CartSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserData', required: true },
    packageId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'package', required: true },
}, { timestamps: true });
const cartModel = mongoose_1.default.model("Cart", CartSchema);
exports.cartModel = cartModel;
//# sourceMappingURL=cart.model.js.map