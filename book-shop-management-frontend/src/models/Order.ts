import {CartItem} from "./CartItem.ts";

export class Order {
        orderId!:string;
        customerId!:string;
        date!:string;
        customerName!:string;
        total!:number;
        discount!:number;
        subtotal!:number;
    cartItems:CartItem[];

    constructor(orderId:string,customerId:string,date:string,customerName:string,total:number,discount:number,subtotal:number,cartItems:CartItem[]) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.date = date;
        this.customerName = customerName;
        this.total = total;
        this.discount = discount;
        this.subtotal = subtotal;
        this.cartItems = cartItems;

    }
}