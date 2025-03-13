import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Appdispatch } from "../store/store.tsx";
import { getAllCustomer } from "../reducer/CustomerSlice.ts";
import { getAllItem } from "../reducer/ItemSlice.ts";
import { getAllOrders } from "../reducer/OrderSlice.ts";
import { logOutUser } from "../reducer/UserSlice.ts";

export function Home() {
    const customers = useSelector(state => state.customer.customers);
    const items = useSelector(state => state.item.items);
    const orders = useSelector(state => state.orders.orders);
    const user = useSelector(state => state.user.currentUser); // Assuming `currentUser` holds the logged-in user info

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

    return (
        <section id="home" className="flex  bg-yellow-100">
            {/* Left Sidebar */}
            <aside className="w-1/6 bg-blue-200 p-9 h-lvh">
                <h2 className="text-xl font-bold">Hello Malith!</h2>
                <p className="mt-2">
                    <strong>{user?.name || name}</strong> {/* Displays the user's name or "Guest" if not available */}
                </p>
                <button
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded fixed bottom-1"
                    onClick={() => dispatch(logOutUser())}
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="w-3/4 p-4 align-middle">
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-4 shadow-black ">
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-lg font-bold">Total Customers</h3>
                        <div className="flex justify-center items-center h-24 w-24 bg-blue-600 text-white text-2xl font-bold rounded-full mx-auto">
                            {customers.length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-lg font-bold">Total Items in Stock</h3>
                        <div className="flex justify-center items-center h-24 w-24 bg-green-500 text-white text-2xl font-bold rounded-full mx-auto">
                            {items.length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-lg font-bold">Out of Stock Items</h3>
                        <div className="flex justify-center items-center h-24 w-24 bg-red-500 text-white text-2xl font-bold rounded-full mx-auto">
                            {outOfStock()}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-lg font-bold">Total Sales</h3>
                        <div className="flex justify-center items-center h-24 w-24 bg-yellow-500 text-white text-2xl font-bold rounded-full mx-auto">
                            {orders.length}
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
                    <p className="text-gray-600 mb-4">
                        Welcome to the dashboard! Follow these steps to make the most out of this application:
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-bold mr-3">
                1
            </span>
                            <span className="text-gray-700">
                View total items in stock, total sales, customers, and out-of-stock items.
            </span>
                        </li>
                        <li className="flex items-center">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full text-sm font-bold mr-3">
                2
            </span>
                            <span className="text-gray-700">
                Click <strong>"New Order"</strong> to quickly create a new order.
            </span>
                        </li>
                        <li className="flex items-center">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-yellow-500 text-white rounded-full text-sm font-bold mr-3">
                3
            </span>
                            <span className="text-gray-700">
                Manage your customers by clicking on the <strong>"Customer"</strong> section.
            </span>
                        </li>
                        <li className="flex items-center">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-sm font-bold mr-3">
                4
            </span>
                            <span className="text-gray-700">
                Use the search bar to quickly find customers or items.
            </span>
                        </li>
                        <li className="flex items-center">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-500 text-white rounded-full text-sm font-bold mr-3">
                5
            </span>
                            <span className="text-gray-700">
                Always log out after use to secure your account.
            </span>
                        </li>
                    </ul>
                </div>


                <footer className="mt-6 p-4 bg-gray-200 text-center shadow-black">
                    <p>&copy; 2025 Malith Shehan. All rights reserved.</p>
                    <p>
                        <a href="/privacy" className="text-blue-500">Privacy Policy</a> |
                        <a href="https://github.com/MalithShehan" className="text-blue-500"> Contact Us</a>
                    </p>
                </footer>
            </div>
        </section>
    );
}
