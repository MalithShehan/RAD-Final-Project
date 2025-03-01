import {Order} from "./Order.ts";
import {Item} from "./Item.ts";

export class OrderDetail{
    order!:Order;
    itemList:Item[] = []
}