"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_modal_1 = require("../modals/vendor.modal");
const vendor_modal_2 = __importDefault(require("../modals/vendor.modal"));
function checkorderType(arr) {
    let ans = "";
    arr.forEach((ele) => {
        if (!vendor_modal_1.types.includes(ele.productType)) {
            ans = ele.productType;
        }
    });
    return ans;
}
function checkorders(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { products, orderBy, deliveryTime } = req.body;
        if (!products || products.length === 0 || !orderBy || !deliveryTime) {
            res.status(400).send({ message: "'missing required details" });
        }
        else {
            let x = checkorderType(products);
            if (x.length > 0) {
                res.status(400).send({ message: `invalide productType : ${x} in productList` });
            }
            else {
                for (let i = 0; i < products.length; i++) {
                    let vs = yield vendor_modal_2.default.find({ productType: products[i].productType }).sort({ sellingPrice: 1 }).limit(1);
                    products[i].vendorId = vs[0]._id;
                }
                next();
            }
        }
    });
}
exports.default = checkorders;
