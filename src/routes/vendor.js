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
const express_1 = __importDefault(require("express"));
const vendor_modal_1 = __importDefault(require("../modals/vendor.modal"));
const vendor_modal_2 = require("../modals/vendor.modal");
const app = express_1.default.Router();
// create vendor
app.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, productType, sellingPrice } = req.body;
    if (!name || !vendor_modal_2.types.includes(productType) || !sellingPrice) {
        res.status(400).send({ message: "missing required data" });
    }
    else {
        try {
            yield vendor_modal_1.default.create(req.body);
            res.status(200).send({ message: "new Vendor added successfully" });
        }
        catch (e) {
            res.send(e.message);
        }
    }
}));
// view all vendors
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield vendor_modal_1.default.find();
        res.send(data);
    }
    catch (e) {
        res.send(e.message);
    }
}));
// view perticular vendor
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let data = yield vendor_modal_1.default.findOne({ _id: id });
        res.status(200).send({ data: data });
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
}));
exports.default = app;
