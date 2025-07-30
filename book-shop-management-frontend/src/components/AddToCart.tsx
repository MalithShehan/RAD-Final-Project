// src/components/AddItemModal.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../models/Item.ts";
import { addToCart } from "../reducer/OrderDetailSlice.ts";
import { toast } from "react-toastify";

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    suggestions: Item[];
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, suggestions }) => {

    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);

    const [itemCode, setItemCode] = useState('');
    const [desc, setDesc] = useState('');
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [qty, setQty] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleItemSelect = (item: Item) => {
        setItemCode(item.itemCode);
        setDesc(item.desc);
        setUnitPrice(item.price);
        setShowSuggestions(false);
        setQty(1);
        setSubTotal(item.price);
    };

    const handleQuantityChange = (value: string) => {
    const qty = Number(value);
    if (isNaN(qty) || qty < 0) {
        // Ignore invalid inputs or negative quantities
        setQty(0);
        setSubTotal(0);
        return;
    }
    setQty(qty);
    setSubTotal(qty * unitPrice);
};

    const handleAddToCart = () => {
        if (!itemCode || qty <= 0) {
            toast.warning("⚠️ Please select an item and valid quantity.");
            return;
        }

        const item = items.find((i: Item) => i.itemCode === itemCode);

        if (!item) {
            toast.error("❌ Item not found.");
            return;
        }

        if (item.qto < qty) {
            toast.error(`❌ Insufficient stock for "${item.desc}". Available: ${item.qto}`);
            return;
        }

        const cartItem = {
            itemCode,
            desc,
            unitPrice,
            qty,
            subTotal: unitPrice * qty,
        };

        dispatch(addToCart(cartItem));
        toast.success(`✅ "${item.desc}" added to cart!`);

        // Reset form
        setItemCode('');
        setDesc('');
        setUnitPrice(0);
        setQty(0);
        setSubTotal(0);
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
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        {/* Suggestions List */}
                        {showSuggestions && suggestions.length > 0 && (
                            <ul id="item-id-suggestions" className="mt-2 border border-gray-300 rounded">
                                {suggestions.map((item) => (
                                    <li
                                        key={item.itemCode}
                                        className="border-b p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleItemSelect(item)}
                                    >
                                        {item.desc}
                                    </li>
                                ))}
                            </ul>
                        )}
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
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddItemModal;