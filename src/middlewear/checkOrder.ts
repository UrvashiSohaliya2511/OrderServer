import express from "express";
import { types } from '../modals/vendor.modal';
import vendors from "../modals/vendor.modal";
function checkorderType(arr: []) {
    let ans = "";

    arr.forEach((ele: any) => {
        if (!types.includes(ele.productType)) {
            ans = ele.productType;
        } 
    });
    return ans;
}
async function checkorders(req:express.Request,res:express.Response,next:express.NextFunction) {
    const { products, orderBy, deliveryTime } = req.body;
    if (!products || products.length === 0 || !orderBy || !deliveryTime) {
        res.status(400).send({ message: "'missing required details" });
    } else {
        
        let x = checkorderType(products);

        if (x.length > 0) {
              res.status(400).send({ message: `invalide productType : ${x} in productList` });
        } else {
           
            
            for (let i = 0; i < products.length; i++){
                let vs = await vendors.find({ productType: products[i].productType }).sort({sellingPrice:1}).limit(1);
            
                products[i].vendorId = vs[0]._id ;
            }
           
        
        next();    
        }
        
    }
    
    
}
export default checkorders;