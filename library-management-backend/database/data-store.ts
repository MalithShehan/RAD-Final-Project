import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt';
import Customer from "../models/Customer";
import Item from "../models/Item";
import Order from "../models/Order";
import {User} from "../models/User";

const prisma = new PrismaClient()

//Customer Ops
export async function CustomerAdd(c:Customer){
    try{
        const newCustomer =  await prisma.customer.create({
            data:{
                id:c.id,
                name:c.name,
                address:c.address,
                phone:c.phone,
            }
        })
        console.log("Customer added successfully.")
    }
    catch(err){
        console.log(err)
    }
}
export async function CustomerDelete(id:String){
    try {
        await prisma.customer.delete({
            where: {
                id: String(id)
            }
        });
        console.log("Customer deleted successfully.")
    }
    catch(err){
        console.log(err)
    }
}
export async function CustomerUpdate(id:String,c:Customer){
    try {
        await prisma.customer.update({
            where: {id:String(id)},
            data:{
                id:String(c.id),
                name:c.name,
                address:c.address,
                phone:c.phone,
            }
        });
        console.log("Customer updated successfully.")

    }catch (err){
        console.log(err)
    }
}
export async function CustomerGetById(id:String){
    try {
        return await prisma.customer.findUnique({
            where: {id: String(id)},

        });
    }catch(err){
        console.log(err)
    }
}
export async function CustomerGetAll(){
    try {
        return await prisma.customer.findMany()
    }
    catch(err){
        console.log(err)
    }
}
//Item Ops

export async function ItemAdd(i:Item){
    try {
        const addItem = await prisma.item.create({
            data:{
                itemCode:i.itemCode,
                desc:i.desc,
                author:i.author,
                qto:i.qto,
                price:i.price
            }
        });
        console.log("Item added successfully")
    }catch (err){
        console.log(err)
    }
}
export async function ItemDelete(id:string){
    try {
        await prisma.item.delete({
            where:{itemCode:id}
        })
    }catch(err){
        console.log(err)
    }
}
export async function ItemUpdate(id:string,i:Item){
    try {
        await prisma.item.update({
            where:{
                itemCode:id
            },
            data:{
                itemCode:i.itemCode,
                desc:i.desc,
                author:i.author,
                qto:i.qto,
                price:i.price
            }
        })
    }catch (err){
        console.log(err)
    }
}
export async function ItemGetById(id:string){
    try{
        return await prisma.item.findUnique({where:{itemCode:String(id)},})

    }catch (err){
        console.log(err)
    }
}
export async function ItemGetAll(){
    try {
        return await prisma.item.findMany()
    }catch (err){
        console.log(err)
    }
}
//Order Ops
export async function OrderAdd(o:Order){
    try {
        await prisma.$transaction(async (prisma)=>{
            const addOrder = await prisma.orders.create({
                data:{
                    orderId : o.orderId,
                    customerId : o.customerId,
                    date: o.date,
                    customerName:o.customerName,
                    total:o.total,
                    discount:o.discount,
                    subtotal:o.subtotal,
                    orderDetails:{
                        create: o.orderDetails.map(detail =>({
                            itemCode:detail.itemCode,
                        }))
                    }
                }
            });
            await Promise.all(
                o.orderDetails.map(detail=>prisma.item.update({
                    where:{itemCode:detail.itemCode},
                    data:{qto:{decrement:detail.quantity}}
                }))
            )
        })
        console.log("Order added successfully")
    }catch(err){
        console.log(err)
    }
}
export async function OrderDelete(id:string){
    try {
        await prisma.orders.delete({
            where:{orderId:String(id)},
        })
        console.log("Order deleted successfully")
    }catch (err){
        console.log(err)
    }
}
export async function OrderGetAll(){
    try {
        return await prisma.orders.findMany()
    }catch (err){
        console.log("Error loading orders")
    }
}
//User Ops
export async function verifyUserCredentials(verifyUser: User) {
    const user : User | null = await prisma.user.findUnique({
        where: { username: verifyUser.username },
    });
    if (!user) {
        return false;
    }

    return await bcrypt.compare(verifyUser.password, user.password);
}

export async function createUser(user : User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const addedUser = await prisma.user.create({
        data: {
            username : user.username,
            password : hashedPassword,
        },
    });
    console.log("User created:", addedUser);
}