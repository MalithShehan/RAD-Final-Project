import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { CartItem } from "../models/CartItem.ts";
import { deleteFromCart, updateCart } from "../reducer/OrderDetailSlice.ts";
import { toast } from "react-toastify";

interface UpdateCartItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    clickedItem: CartItem | null;
}
const UpdateCart: (React.FC<UpdateCartItemModalProps>) = ({ isOpen, onClose, clickedItem }) => {

    const dispatch = useDispatch();

    const [itemCode, setItemCode] = useState('');
    const [desc, setDesc] = useState('');
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [qty, setQty] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);

    useEffect(() => {
        if (clickedItem) {
            setItemCode(clickedItem.itemCode);
            setDesc(clickedItem.desc);
            setUnitPrice(clickedItem.unitPrice);
            setQty(clickedItem.qty);
            setSubTotal(clickedItem.subTotal);
        };
    }, [clickedItem]);
    const handleQuantityChange = (value: string) => {
        const qty = Number(value);
        setQty(qty);
        setSubTotal(qty * unitPrice);
    };

    const handleAddToCart = () => {
        if (!itemCode || !desc || unitPrice <= 0 || qty <= 0) {
            toast.warning("⚠️ Please fill all fields correctly before adding to cart.");
            return;
        }

        const cartItem = {
            itemCode,
            desc,
            unitPrice,
            qty,
            subTotal: unitPrice * qty,
        };

        dispatch(updateCart(cartItem));
        toast.success("🛒 Cart item updated!");

        // Reset fields
        setItemCode('');
        setDesc('');
        setUnitPrice(0);
        setQty(0);
        setSubTotal(0);
        onClose();
    };

    const handleDelete = () => {
        if (!clickedItem) {
            toast.warning("⚠️ No item selected to delete.");
            return;
        }

        dispatch(deleteFromCart(clickedItem));
        toast.success("🗑️ Item removed from cart.");
        onClose();
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg w-11/12 md:w-1/2">
                <h1 className="text-2xl font-bold mb-4">Add Item to Order</h1>
                <form className="space-y-3">
                    <div>
                        <label htmlFor="order-item-id" className="form-label">Item Id</label>
                        <input
                            type="text"
                            className="form-control border rounded p-2 w-full"
                            id="order-item-id"
                            value={itemCode}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="order-item-desc" className="form-label">Item Description</label>
                        <input
                            type="text"
                            className="form-control border rounded p-2 w-full"
                            id="order-item-desc"
                            value={desc}
                            onChange={(e) => {
                                setDesc(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="order-item-price" className="form-label">Unit Price</label>
                        <input
                            type="text"
                            className="form-control border rounded p-2 w-full"
                            id="order-item-price"
                            value={unitPrice}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="order-item-qty" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control border rounded p-2 w-full"
                            id="order-item-qty"
                            placeholder="Enter Quantity"
                            value={qty}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="order-sub-total" className="form-label">Sub Total</label>
                        <input
                            type="text"
                            className="form-control border rounded p-2 w-full"
                            id="order-sub-total"
                            value={subTotal}
                            readOnly
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-success w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </form>
                <button
                    type="button"
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    type="button"
                    className="mt-4 w-full border-red-500 border-2 text-red-400 py-2 rounded-md hover:bg-red-500 hover:text-white"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
export default UpdateCart;