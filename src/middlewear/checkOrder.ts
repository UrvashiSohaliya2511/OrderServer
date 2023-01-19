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
           
            let nextRoute = true;
            for (let i = 0; i < products.length; i++){
                let vs = await vendors.find({ productType: products[i].productType }).sort({sellingPrice:1}).limit(1);
                if (vs.length === 0) {
                    nextRoute = false;
                    res.status(400).send({ message: `sorry can not find vendor for ${ products[i].productType} ` });
                    break;
                } else {
                    products[i].vendorId = vs[0]._id;
                products[i].Vendorname = vs[0].name;
                products[i].vendorsPrice = vs[0].sellingPrice;
            }
                
            }
            if (nextRoute) {
                next();   
           }
        
        
        }
        
    }
    
    
}
export default checkorders;