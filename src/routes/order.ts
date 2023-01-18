import express from 'express';
import { types } from '../modals/vendor.modal';
import vendors from "../modals/vendor.modal";
import orders from "../modals/order.modal";
import checkorders from '../middlewear/checkOrder';
const app = express.Router();




app.post('/createorder',checkorders, async(req, res) => {
    try {
        
        await orders.create(req.body);
        res.status(200).send("order created")

    } catch (e) {
        res.status(404).send({ message: e });
    }
   
});

app.get('/vieworder/:id', async(req, res) => {
    try {
        let data = await orders.findOne({ _id: req.params.id });
        res.status(200).send({data:data})
    }catch(e){
        res.status(404).send({message:e})
    }
});
app.get('/allorders', async (req, res) => {
     try {
        let data = await orders.find();
        res.status(200).send({data:data})
    }catch(e){
        res.status(404).send({message:e})
    }
})

app.patch('/commitorder/:id', async(req, res) => {
    let { status } = req.body;
    try {
       await orders.findByIdAndUpdate(req.params.id,{status});
        res.status(200).send({ message: "data updated successfully" });
    }catch(e){
        res.status(404).send({message:e})
    }
   
})
export default app;