import OrderDetails from "./OrderDetails";

export default class Order {
    orderId!:string;
    customerId!:string;
    date!:string;
    customerName!:string;
    total!:number;
    discount!:string;
    subtotal!:number;
    orderDetails!:OrderDetails[];
}