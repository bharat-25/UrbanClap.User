"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageModel = exports.BookingModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserData', required: true },
    packageId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'package', required: true },
    name: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    slotdate: { type: Date, required: true },
    slotTime: { type: String, required: true }
}, { timestamps: true });
const PackageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category_id: { type: Number, required: true },
    price: { type: Number, required: true },
    parent_id: { type: [Number], ref: "Services", required: true, default: null },
});
const PackageModel = mongoose_1.default.model("Packages", PackageSchema);
exports.PackageModel = PackageModel;
const BookingModel = mongoose_1.default.model("Booking", BookingSchema);
exports.BookingModel = BookingModel;
//# sourceMappingURL=booking.schema.js.map