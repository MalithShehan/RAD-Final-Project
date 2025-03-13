import {useEffect, useState} from "react";
import SearchOrder from "../components/SearchOrder.tsx";
import {useDispatch, useSelector} from "react-redux";
import {Order} from "../models/Order.ts";
import {Appdispatch} from "../store/store.tsx";
import {deleteOrder, getAllOrders} from "../reducer/OrderSlice.ts";

export function OrdersDash(){
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch<Appdispatch>();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch]);
    const handleSearch = ()=>{
        //TODO: Handle search
        setSearchTerm(searchTerm)
    }
    const handleOrder =async (order:Order)=>{
        const isConfirmed = window.confirm(`Do you want to delete this order? ${order.orderId}`);
        if(isConfirmed){
            await dispatch(deleteOrder(order.orderId));
        }
        await dispatch(getAllOrders())
    }
    const filteredOrders = orders?.filter((order:Order) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            order.date?.toLowerCase().includes(lowerCaseSearchTerm) ||
            order.customerName?.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });
    return (
        <div className="p-8 bg-gray-50 min-h-screen"
             style={{ background: 'linear-gradient(to right, #ccff66, #ffff66)' }}
        >
            {/* Header Section */}
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Orders Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage and review all orders in one place</p>
            </div>

            {/* Search and Actions Section */}
            <div className="flex justify-between items-center mb-6">
                <SearchOrder
                    handleSearch={handleSearch}
                    setSearchTerm={setSearchTerm}
                />
            </div>

            {/* Table Section */}
            <div className="bg-transparent shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-sky-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subtotal</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order: Order) => (
                        <tr
                            key={order.orderId}
                            className="hover:bg-sky-100 cursor-pointer transition-all duration-200"
                            onClick={() => handleOrder(order)}
                        >
                            <td className="px-6 py-4 text-sm text-gray-700">{order.orderId}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{order.customerName}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{order.total}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{order.discount}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{order.subtotal}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}