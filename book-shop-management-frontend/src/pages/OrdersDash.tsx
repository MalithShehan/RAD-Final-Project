import { useEffect, useState } from "react";
import SearchOrder from "../components/SearchOrder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { Order } from "../models/Order.ts";
import { Appdispatch } from "../store/store.tsx";
import { deleteOrder, getAllOrders } from "../reducer/OrderSlice.ts";
import { FaTrash } from "react-icons/fa";

export function OrdersDash() {
  const orders = useSelector(state => state.orders.orders) || [];
  const dispatch = useDispatch<Appdispatch>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleSearch = () => {
    setSearchTerm(searchTerm);
  };

  const handleDelete = async (orderId: string) => {
    const isConfirmed = window.confirm(`Do you want to delete this order? ${orderId}`);
    if (isConfirmed) {
      await dispatch(deleteOrder(orderId));
      dispatch(getAllOrders());
    }
  };

  const filteredOrders = orders.filter((order: Order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order.date?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.customerName?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        background: 'linear-gradient(to right, #ccff66, #ffff66, #66ffcc)', // bright, smooth gradient
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg">
          Orders Dashboard
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Manage and review all orders in one vibrant place
        </p>
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <SearchOrder handleSearch={handleSearch} setSearchTerm={setSearchTerm} />
      </div>

      {/* Table Section */}
      <div className="bg-white max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden border-4 border-yellow-400">
        <table className="min-w-full divide-y divide-gray-300">
          <thead
            className="bg-gradient-to-r from-green-300 via-yellow-300 to-green-300"
            style={{ color: '#004d00' }}
          >
            <tr>
              {[
                "Order ID",
                "Customer Name",
                "Date",
                "Total",
                "Discount",
                "Subtotal",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-8 py-4 text-left text-md font-semibold tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gradient-to-b from-yellow-50 to-yellow-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400 font-semibold text-xl">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order: Order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-yellow-200 cursor-pointer transition-colors duration-300"
                >
                  <td className="px-8 py-4 text-gray-800 font-medium">{order.orderId}</td>
                  <td className="px-8 py-4 text-gray-700">{order.customerName}</td>
                  <td className="px-8 py-4 text-gray-700">{order.date}</td>
                  <td className="px-8 py-4 text-gray-700">{order.total}</td>
                  <td className="px-8 py-4 text-gray-700">{order.discount}</td>
                  <td className="px-8 py-4 text-gray-700">{order.subtotal}</td>
                  <td className="px-8 py-4 text-center text-gray-700">
                    <button
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(order.orderId);
                      }}
                      aria-label={`Delete order ${order.orderId}`}
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
