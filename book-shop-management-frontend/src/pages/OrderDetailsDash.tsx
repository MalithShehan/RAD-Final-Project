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
import { toast } from "react-toastify";

export function OrderDetailsDash() {
  const items: Item[] = useSelector(state => state.item.items) || [];
  const cartItems: CartItem[] = useSelector(state => state.cart.cartItems) || [];
  const customerList: Customer[] = useSelector(state => state.customer.customers) || [];

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
      toast.error("⚠️ Please fill out all the necessary details");
      return;
    }

    const newOrder: Order = {
      orderId,
      date: orderDate,
      customerName,
      customerId,
      total,
      discount,
      subtotal: subTotal,
      cartItems,
    };

    try {
      await dispatch(addOrder(newOrder));
      toast.success("✅ Order placed successfully!");
      navigate('/home/orders');
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("❌ Failed to complete the order. Please try again.");
    }
  };


  function handleFinish() {
    let cartTotal = 0;

    cartItems.forEach((item: CartItem) => {
      cartTotal += item.subTotal;
    });

    setTotal(cartTotal);
    dispatch(clearCart());

    // Show success toast
    toast.success("✅ Order finished and cart cleared!");
  }

  function handleSearch() {
    const suggested: Item[] = items.filter((item: Item) =>
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
    <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 bg-gradient-to-r from-green-100 via-yellow-100 to-lime-200 min-h-screen">
      {/* Left Section: Order Form */}
      <div className="w-full md:w-1/3 bg-transparent p-6 rounded-2xl shadow-2xl border border-green-200">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6"> New Order</h1>
        <form className="space-y-4 text-sm">
          <div>
            <label htmlFor="order-date" className="block font-medium text-gray-600">Date</label>
            <input
              type="date"
              id="order-date"
              className="w-full border rounded-lg p-2 border-green-400 focus:ring-green-500 focus:outline-none"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-600">Customer Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 border-green-400"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && customerList.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded shadow-md">
                {customerList.map((cust: Customer) => (
                  <li
                    key={cust.id}
                    className="border-b p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleCustomerSelect(cust)}
                  >
                    {cust.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-600">Discount %</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 border-green-400"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-600">Cash</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 border-green-400"
              value={cash}
              onChange={(e) => setCash(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-600">Balance</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 border-green-400 bg-gray-100"
              value={balance}
              readOnly
            />
          </div>

          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition duration-200"
            onClick={handleBuy}
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Right Section: Items List */}
      <div className="w-full md:w-2/3 bg-transparent p-6 rounded-2xl shadow-2xl border border-yellow-200">
        <SearchOrder setSearchTerm={setSearchTerm} handleSearch={handleSearch} >Item Add</SearchOrder>
        <h1 className="text-3xl font-bold text-center text-yellow-700 my-4">Cart Summary</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-yellow-100 text-gray-900 font-semibold">
              <tr>
                <th className="p-2 border border-yellow-200">Item Code</th>
                <th className="p-2 border border-yellow-200">Description</th>
                <th className="p-2 border border-yellow-200">Unit Price</th>
                <th className="p-2 border border-yellow-200">Qty</th>
                <th className="p-2 border border-yellow-200">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem) => (
                <tr
                  key={item.itemCode}
                  className="hover:bg-yellow-50 cursor-pointer"
                  onClick={() => handleItemModify(item)}
                >
                  <td className="p-2 border">{item.itemCode}</td>
                  <td className="p-2 border">{item.desc}</td>
                  <td className="p-2 border">{item.unitPrice}</td>
                  <td className="p-2 border">{item.qty}</td>
                  <td className="p-2 border">{item.subTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
            onClick={handleFinish}
          >
            Finished
          </button>
        </div>

        <AddToCart isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} suggestions={suggestions} />
        <UpdateCart isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} clickedItem={clickedItem} />
      </div>
    </div>
  );
}