import express from 'express';
import vendors from "../modals/vendor.modal";
import {types} from "../modals/vendor.modal";
const app = express.Router();

app.post('/create', async(req, res) => {

    let { name, productType, sellingPrice } = req.body;

    if (!name || !types.includes(productType) || !sellingPrice) {
        res.status(400).send({ message: "missing required data" });
    }
    else {
        try {
            await vendors.create(req.body);  
            res.status(200).send({message:"new Vendor added successfully"})
        } catch (e:any) {
             res.send(e.message)
        }
    }
    
   
});

app.get('/', async(req, res) => {
    try {
        let data = await vendors.find();
        res.send(data)
    } catch (e:any) {
        res.send(e.message)
    }
});


export default app;