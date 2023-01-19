import express from 'express';
import vendors from "../modals/vendor.modal";
import {types} from "../modals/vendor.modal";
const app = express.Router();

// create vendor
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

// view all vendors

app.get('/', async(req, res) => {
    try {
        let data = await vendors.find();
        res.send(data)
    } catch (e:any) {
        res.send(e.message)
    }
});

// view perticular vendor

app.get("/:id", async (req, res) => {
    let { id } = req.params;
    try {

        let data = await vendors.findOne({ _id: id });
        res.status(200).send({data:data})
    }catch(e:any){
        res.status(400).send({message:e.message})
    }

});
export default app;