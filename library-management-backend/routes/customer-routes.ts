import express from "express";
import {Customer} from "@prisma/client";
import {CustomerAdd, CustomerDelete, CustomerGetAll, CustomerGetById, CustomerUpdate} from "../database/data-store";

const router = express.Router();

router.post('/add', async (req: express.Request, res: express.Response) => {
    const customer: Customer = req.body;
    try {
        const addedCustomer = await CustomerAdd(customer);
        res.send("Customer has been added");
    } catch (err) {
        console.log("Could not add customer", err);
    }
})

router.get('/get/:id',async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        const find = await CustomerGetById(id);
        res.json(find);
    }catch(err){
        console.log("Could not find customer", err);
    }
})
router.delete('/delete/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        await CustomerDelete(id);
        res.send("Customer has been deleted");
    }catch (err){
        console.log("Could not delete customer", err);
    }
})
router.put('/update/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const customer: Customer = req.body;
    try{
        const updatedCustomer = await CustomerUpdate(id, customer);
        res.send("Customer has been updated");
    }catch (err){
        console.log("Could not update customer", err);
    }
})
router.get('/getAll', async (req: express.Request, res: express.Response) => {

    try {
        res.json( await CustomerGetAll());
    }catch (err){
        console.log("Could not load customers ! ")
    }
})

export default router;