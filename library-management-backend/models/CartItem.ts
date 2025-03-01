export class CartItem{
    itemCode: string;
    desc:string;
    unitPrice:number;
    qty:number;
    subTotal:number;

    constructor(itemCode: string, desc:string, unitPrice:number, qty:number, subtotal:number) {
        this.itemCode = itemCode;
        this.desc = desc;
        this.unitPrice = unitPrice;
        this.qty = qty;
        this.subTotal = subtotal;
    }
}