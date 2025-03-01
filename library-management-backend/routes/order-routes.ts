import express from "express";
import {OrderAdd, OrderDelete, OrderGetAll} from "../database/data-store";
import Order from "../models/Order";
import OrderDetails from "../models/OrderDetails";
import {CartItem} from "../models/CartItem";

const router = express.Router();

router.get('/get',(req,res)=>{

})
router.post('/add',async (req,res)=>{
    const order = req.body;
    try {
        const orderDetails:OrderDetails[] = []
        order.cartItems.map((item:CartItem)=>{
            orderDetails.push(new OrderDetails(item.itemCode,item.qty));
        })
        const saveOrder : Order ={
            orderId:order.orderId,
            date: order.date,
            customerName: order.customerName,
            customerId : order.customerId,
            total:order.total,
            discount:String(order.discount)+"%",
            subtotal:order.subtotal,
            orderDetails:orderDetails,
        }
        await OrderAdd(saveOrder);
        res.send("Order has been placed");
    }catch(err){
        res.send("Error placing order")
    }
})
router.put('/update/:id',(req,res)=>{

})
router.delete('/delete/:id',async (req,res)=>{
    try {
        await OrderDelete(req.params.id);
        res.send("Order Deleted")
    }catch (err){
        res.status(500).send("Error deleting order")
    }
})
router.get('/getAll',async (req,res)=>{
    try {
        const orders  = await OrderGetAll();
        res.json(orders);
    }catch (err){
        console.log(err)
        res.status(500).send("Something went wrong...")
    }
})
export default router;