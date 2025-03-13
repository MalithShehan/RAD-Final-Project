import React, { useEffect, useState } from 'react';
import SearchOrder from "../components/SearchOrder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../models/Item.ts";
import AddToCart from "../components/AddToCart.tsx";
import { CartItem } from "../models/CartItem.ts";
import UpdateCart from "../components/UpdateCart.tsx";
import { v4 } from "uuid";
import { Order } from "../models/Order.ts";
import { Customer } from "../models/Customer.ts";
import { useNavigate } from "react-router";
import { Appdispatch } from "../store/store.tsx";
import { addOrder } from "../reducer/OrderSlice.ts";
import { clearCart } from "../reducer/OrderDetailSlice.ts";

export function OrderDetailsDash() {
    const items = useSelector(state => state.item.items);
    const cartItems = useSelector(state => state.cart.cartItems);
    const customerList = useSelector(state => state.customer.customers);
    const dispatch = useDispatch<Appdispatch>();
    const navigate = useNavigate();

    const [orderId, setOrderId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [total, setTotal] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [cash, setCash] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const [clickedItem, setClickedItem] = useState<CartItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [order, setOrder] = useState<Order>({});

    useEffect(() => {
        setOrderId(`OID-${v4()}`);
    }, []);

    useEffect(() => {
        const discountAmount = (total * (discount / 100));
        const calculatedSubTotal = total - discountAmount;
        setSubTotal(calculatedSubTotal);
        setBalance(cash - calculatedSubTotal);
    }, [total, discount, cash]);

    const handleBuy = async () => {
        if (!orderDate || !cash || !customerName) {
            alert("Please fill out all the necessary details");
            return;
        }
        if (order) {
            order.orderId = orderId;
            order.date = orderDate;
            order.customerName = customerName;
            order.customerId = customerId;
            order.total = total;
            order.discount = discount;
            order.subtotal = subTotal;
        }
        await dispatch(addOrder(order));
        navigate('/home/orders');
    };

    function handleFinish() {
        order.cartItems = cartItems;
        let cartTotal = 0;

        cartItems.forEach((item: CartItem) => {
            cartTotal += item.subTotal;
        });

        setTotal(cartTotal);
        dispatch(clearCart());
    }

    function handleSearch() {
        const suggested: Item[] = [];
        items.forEach((item: Item) => {
            if (item.desc.toLowerCase().includes(searchTerm.toLowerCase())) {
                suggested.push(item);
            }
        });
        setSuggestions(suggested);
        setIsModalOpen(true);
    }

    function handleItemModify(item: CartItem) {
        setClickedItem(item);
        setIsUpdateOpen(true);
    }

    function handleCustomerSelect(customer: Customer) {
        setCustomerId(customer.id);
        setCustomerName(customer.name);
        setShowSuggestions(false);
    }

    return (
        <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 bg-gradient-to-r from-yellow-200 via-green-200 to-yellow-100">
            {/* Left Section: Order Form */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">New Order</h1>
                <form className="space-y-4">
                    {/* Order ID */}
                    <div>
                        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
                        <input
                            type="text"
                            id="orderId"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                            value={orderId}
                            readOnly
                        />
                    </div>

                    {/* Customer ID */}
                    <div>
                        <label htmlFor="order-cust-id" className="block text-sm font-medium text-gray-700">Customer ID</label>
                        <input
                            type="text"
                            id="order-cust-id"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                            readOnly
                        />
                    </div>

                    {/* Order Date */}
                    <div>
                        <label htmlFor="order-date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            id="order-date"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Customer Name */}
                    <div>
                        <label htmlFor="order-item-desc" className="block text-sm font-medium text-gray-700">Customer Name</label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                            id="order-item-desc"
                            value={customerName}
                            onChange={(e) => {
                                setCustomerName(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        {/* Suggestions List */}
                        {showSuggestions && customerList.length > 0 && (
                            <ul id="item-id-suggestions" className="mt-2 border border-gray-300 rounded shadow-md">
                                {customerList.map((item: Customer) => (
                                    <li
                                        key={item.id}
                                        className="border-b p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleCustomerSelect(item)}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Total */}
                    <div>
                        <label htmlFor="order-total" className="block text-sm font-medium text-gray-700">Total</label>
                        <input
                            type="number"
                            id="order-total"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                            value={total}
                            onChange={(e) => setTotal(Number(e.target.value))}
                            readOnly
                        />
                    </div>

                    {/* Discount */}
                    <div>
                        <label htmlFor="order-discount" className="block text-sm font-medium text-gray-700">Discount %</label>
                        <input
                            type="number"
                            id="order-discount"
                            className="w-full border-gray-300 rounded-md bg-gray-100 shadow-sm"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                        />
                    </div>

                    {/* Subtotal */}
                    <div>
                        <label htmlFor="order-full-total" className="block text-sm font-medium text-gray-700">Sub Total</label>
                        <input
                            type="number"
                            id="order-full-total"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                            value={subTotal}
                            readOnly
                        />
                    </div>

                    {/* Cash */}
                    <div>
                        <label htmlFor="customer-cash" className="block text-sm font-medium text-gray-700">Cash</label>
                        <input
                            type="number"
                            id="customer-cash"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                            value={cash}
                            onChange={(e) => setCash(Number(e.target.value))}
                            required
                        />
                    </div>

                    {/* Balance */}
                    <div>
                        <label htmlFor="customer-bal" className="block text-sm font-medium text-gray-700">Balance</label>
                        <input
                            type="number"
                            id="customer-bal"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                            value={balance}
                            readOnly
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                        onClick={handleBuy}
                    >
                        Buy
                    </button>
                </form>
            </div>

            {/* Right Section: Items List */}
            <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-lg">
                <SearchOrder setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Item List</h1>

                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#Item Code</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                        <th className="border border-gray-300 px-4 py-2">Qty</th>
                        <th className="border border-gray-300 px-4 py-2">Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item: CartItem) => (
                        <tr key={item.itemCode} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleItemModify(item)}>
                            <td>{item.itemCode}</td>
                            <td>{item.desc}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.qty}</td>
                            <td>{item.subTotal}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        type="button"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                        onClick={handleFinish}
                    >
                        Finished
                    </button>
                    <AddToCart isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} suggestions={suggestions} />
                    <UpdateCart isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} clickedItem={clickedItem} />
                </div>
            </div>
        </div>
    );
}
