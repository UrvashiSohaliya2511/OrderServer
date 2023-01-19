
import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    products: [
        {
        productType: { type: String, required: true },
        quantity: { type: Number, required: true },
        vendorId: { type: Schema.Types.ObjectId, ref: "vendor", required: true },
        Vendorname: { type: String, required: true },
        vendorsPrice:{ type: Number, required: true },
          }
    ],
    
    orderBy: { type: String, required: true },
    status:{
      type: String,
        required: true,
      default:"pending",
      enum : ["pending","cancelled","confirmed"],
    },
    deliveryTime: { type: String, required: true },
    
}); 

const orders = model("orders",orderSchema);
export default orders;