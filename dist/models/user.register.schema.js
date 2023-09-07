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
exports.UserData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var AddressType;
(function (AddressType) {
    AddressType["HOME"] = "home";
    AddressType["WORK"] = "work";
    AddressType["OTHER"] = "other";
})(AddressType || (AddressType = {}));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide an name '],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    },
    mobileno: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: false, // User is initially not logged in
    },
    addresses: [
        {
            addressType: {
                type: String,
                enum: Object.values(AddressType),
                default: AddressType.HOME,
            },
            street: { type: String },
            city: { type: String },
            state: { type: String },
            postalCode: { type: String },
        },
    ],
    cart: []
});
const UserData = mongoose_1.default.model('UserData', UserSchema);
exports.UserData = UserData;
//# sourceMappingURL=user.register.schema.js.map