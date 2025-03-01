export default class OrderDetails {
    constructor(itemCode: string, qty: number) {
        this.itemCode = itemCode;
        this.quantity = qty;
    }

    itemCode: string;
    quantity: number;
}