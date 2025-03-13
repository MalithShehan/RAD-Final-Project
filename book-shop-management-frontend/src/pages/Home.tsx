import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Appdispatch } from "../store/store.tsx";
import { getAllCustomer } from "../reducer/CustomerSlice.ts";
import { getAllItem } from "../reducer/ItemSlice.ts";
import { getAllOrders } from "../reducer/OrderSlice.ts";
import { logOutUser } from "../reducer/UserSlice.ts";
import { FaUsers, FaBox, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export function Home() {
    const customers = useSelector((state) => state.customer.customers);
    const items = useSelector((state) => state.item.items);
    const orders = useSelector((state) => state.orders.orders);
    const user = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch<Appdispatch>();

    useEffect(() => {
        dispatch(getAllCustomer());
        dispatch(getAllItem());
        dispatch(getAllOrders());
    }, [dispatch]);

    function outOfStock() {
        let count = 0;
        items.forEach((item) => {
            if (item.qto === 0) count++;
        });
        return count;
    }

    // Mock data for the chart
    const salesData = [
        { name: "Jan", sales: 40 },
        { name: "Feb", sales: 30 },
        { name: "Mar", sales: 50 },
        { name: "Apr", sales: 80 },
        { name: "May", sales: 60 },
        { name: "Jun", sales: 90 },
    ];

    return (
        <section
            id="home"
            className="flex h-screen w-full"
            style={{ background: 'linear-gradient(to right, #ccff66, #ffff66)' }}
        >

        {/* Left Sidebar */}
            <aside className="w-1/6 bg-[#2aa2a2] p-6 h-full flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center mb-4">
                        <FaUsers className="mr-2" />
                        Hello Malith!
                    </h2>
                    <p className="mb-6">
                        <strong>{user?.name || "Guest"}</strong>
                    </p>
                </div>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center"
                    onClick={() => dispatch(logOutUser())}
                >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="w-5/6 p-6 overflow-y-auto">
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-lg font-bold flex items-center justify-center mb-2">
                            <FaUsers className="mr-2 text-blue-600" />
                            Total Customers
                        </h3>
                        <div className="flex justify-center items-center h-24 w-24 bg-blue-600 text-white text-2xl font-bold rounded-full mx-auto">
                            {customers.length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-lg font-bold flex items-center justify-center mb-2">
                            <FaBox className="mr-2 text-green-500" />
                            Total Items in Stock
                        </h3>
                        <div className="flex justify-center items-center h-24 w-24 bg-green-500 text-white text-2xl font-bold rounded-full mx-auto">
                            {items.length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-lg font-bold flex items-center justify-center mb-2">
                            <FaBox className="mr-2 text-red-500" />
                            Out of Stock Items
                        </h3>
                        <div className="flex justify-center items-center h-24 w-24 bg-red-500 text-white text-2xl font-bold rounded-full mx-auto">
                            {outOfStock()}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-lg font-bold flex items-center justify-center mb-2">
                            <FaShoppingCart className="mr-2 text-yellow-500" />
                            Total Sales
                        </h3>
                        <div className="flex justify-center items-center h-24 w-24 bg-yellow-500 text-white text-2xl font-bold rounded-full mx-auto">
                            {orders.length}
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="mt-8 bg-white p-6 rounded shadow">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Monthly Sales Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Footer */}
                <footer className="mt-8 p-4 bg-gray-200 text-center shadow-md">
                    <p>&copy; 2025 Malith Shehan. All rights reserved.</p>
                    <p>
                        <a href="/privacy" className="text-blue-500">Privacy Policy</a> |
                        <a href="https://github.com/MalithShehan" className="text-blue-500 ml-2">Contact Us</a>
                    </p>
                </footer>
            </div>
        </section>
    );
}
