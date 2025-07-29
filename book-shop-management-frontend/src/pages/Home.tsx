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
    const customers = useSelector((state: any) => state.customer.customers) || [];
    const items = useSelector((state: any) => state.item.items) || [];
    const orders = useSelector((state: any) => state.orders.orders) || [];
    const user = useSelector((state: any) => state.user.currentUser);

    const dispatch = useDispatch<Appdispatch>();

    useEffect(() => {
        dispatch(getAllCustomer());
        dispatch(getAllItem());
        dispatch(getAllOrders());
    }, [dispatch]);

    function outOfStock() {
        return items.filter((item: any) => item.qto === 0).length;
    }

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
            className="flex min-h-screen w-full"
            style={{ background: 'linear-gradient(to right, #8e2de2, #4a00e0)' }}
        >
            {/* Sidebar */}
            <aside className="w-1/6 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6 h-full flex flex-col justify-between shadow-xl">
                <div>
                    <h2 className="text-xl font-bold flex items-center mb-4">
                        <FaUsers className="mr-2" />
                        Hello Malith!
                    </h2>
                    <p className="mb-6 text-lg font-semibold">
                        {user?.name || "Guest"}
                    </p>
                </div>
                <button
                    className="bg-red-500 hover:bg-red-600 transition-all text-white py-2 px-4 rounded flex items-center justify-center"
                    onClick={() => dispatch(logOutUser())}
                >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="w-5/6 p-6 overflow-y-auto text-gray-800">
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard color="from-blue-500 to-indigo-500" icon={<FaUsers />} title="Total Customers" count={customers.length} />
                    <StatCard color="from-green-400 to-emerald-600" icon={<FaBox />} title="Items in Stock" count={items.length} />
                    <StatCard color="from-red-400 to-pink-500" icon={<FaBox />} title="Out of Stock" count={outOfStock()} />
                    <StatCard color="from-yellow-400 to-orange-500" icon={<FaShoppingCart />} title="Total Sales" count={orders.length} />
                </div>

                {/* Chart Section */}
                <div className="mt-10 bg-white p-6 rounded-xl shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">
                        📊 Monthly Sales Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid stroke="#eee" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#7b2cbf" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Footer */}
                <footer className="mt-10 p-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded shadow text-center text-gray-800">
                    <p>&copy; 2025 <strong>Malith Shehan</strong>. All rights reserved.</p>
                    <p className="mt-1">
                        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> |
                        <a href="https://github.com/MalithShehan" className="text-blue-600 hover:underline ml-2">GitHub</a>
                    </p>
                </footer>
            </div>
        </section>
    );
}

// Reusable Card Component
function StatCard({ color, icon, title, count }: { color: string, icon: any, title: string, count: number }) {
    return (
        <div className={`bg-gradient-to-br ${color} text-white p-5 rounded-xl shadow-lg transform transition-transform hover:scale-105`}>
            <div className="flex justify-center items-center text-2xl mb-2">{icon}</div>
            <h4 className="text-lg text-center font-semibold">{title}</h4>
            <div className="text-center text-4xl font-bold mt-3">{count}</div>
        </div>
    );
}
