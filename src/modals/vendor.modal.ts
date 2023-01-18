import { Schema, model } from "mongoose";
export const types = ["tv", "keyboard", "mouse", "bulb", "mobile"];
const vendorSchema = new Schema({
    name:{ type: String, required: true },
    productType:{
      type: String,
      required: true,
      enum : types,
    },
    sellingPrice:{type:Number, required:true}
}); 

const orders = model("vendor",vendorSchema);
export default orders;