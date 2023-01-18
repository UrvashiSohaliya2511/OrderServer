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
const order_modal_1 = __importDefault(require("../modals/order.modal"));
const checkOrder_1 = __importDefault(require("../middlewear/checkOrder"));
const app = express_1.default.Router();
app.post('/createorder', checkOrder_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_modal_1.default.create(req.body);
        res.status(200).send("order created");
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
}));
app.get('/vieworder/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield order_modal_1.default.findOne({ _id: req.params.id });
        res.status(200).send({ data: data });
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
}));
app.get('/allorders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield order_modal_1.default.find();
        res.status(200).send({ data: data });
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
}));
app.patch('/commitorder/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { status } = req.body;
    try {
        yield order_modal_1.default.findByIdAndUpdate(req.params.id, { status });
        res.status(200).send({ message: "data updated successfully" });
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
}));
exports.default = app;
