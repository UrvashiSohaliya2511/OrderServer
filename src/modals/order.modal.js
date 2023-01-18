"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    products: [
        {
            productType: { type: String, required: true },
            quantity: { type: Number, required: true },
            vendorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "vendor", required: true },
        }
    ],
    orderBy: { type: String, required: true },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending", "cancelled", "confirmed"],
    },
    deliveryTime: { type: String, required: true },
});
const orders = (0, mongoose_1.model)("orders", orderSchema);
exports.default = orders;
