"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
const mongoose_1 = require("mongoose");
exports.types = ["tv", "keyboard", "mouse", "bulb", "mobile"];
const vendorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    productType: {
        type: String,
        required: true,
        enum: exports.types,
    },
    sellingPrice: { type: Number, required: true }
});
const orders = (0, mongoose_1.model)("vendor", vendorSchema);
exports.default = orders;
