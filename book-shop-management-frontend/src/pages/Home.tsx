import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Appdispatch} from "../store/store.tsx";
import {getAllCustomer} from "../reducer/CustomerSlice.ts";
import {getAllItem} from "../reducer/ItemSlice.ts";
import {getAllOrders} from "../reducer/OrderSlice.ts";
import {logOutUser} from "../reducer/UserSlice.ts";

export function Home() {
    const customers = useSelector(state => state.customer.customers)
    const item = useSelector(state => state.item.items)
    const orders = useSelector(state => state.orders.orders)

    const dispatch = useDispatch<Appdispatch>();

    useEffect(() => {
        dispatch(getAllCustomer())
        dispatch(getAllItem())
        dispatch(getAllOrders)
    },[dispatch])
    function outOfStock(){
        let count = 0;
        item.forEach((item) => {
            if (item.qto===0) count++
        })
        return count
    }
    return (
        <section id="home" className="flex">
            {/* Left Sidebar */}
            <aside className="w-1/4 bg-gray-200 p-4 h-lvh">
                <h2 className="text-xl font-bold">Hello!</h2>
                <p className="mt-2"> <strong>JohnDoe</strong></p>
                <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded fixed bottom-1"
                        onClick={() => dispatch(logOutUser())}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="w-3/4 p-4">
                <p className="text-2xl text-center font-bold p-4 ">Welcome to Simplify</p>
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-bold">Total Customers</h3>
                        <p className="text-2xl">{customers.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-bold">Total Items in Stock</h3>
                        <p className="text-2xl">{item.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-bold">Out of Stock Items</h3>
                        <p className="text-2xl">{outOfStock()}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-bold">Total Sales</h3>
                        <p className="text-2 xl">{orders.length}</p>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-gray-100 rounded shadow">
                    <h2 className="text-xl font-bold">Instructions</h2>
                    <p className="mt-2">Welcome to the dashboard! Here are some quick tips:</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>This homepage shows total items in stock, total sales, total customers and out of stock items.</li>
                        <li>Click "New order" to create a new order</li>
                        <li>Click on Customer  to manage customers</li>
                        <li>Use the search bar to quickly find customers or items.</li>
                        <li>Log out when you're done to secure your account.</li>
                    </ul>
                </div>

                <footer className="mt-6 p-4 bg-gray-200 text-center">
                    <p>&copy; 2025 Buddhika Pathum . All rights reserved.</p>
                    <p>
                        <a href="/privacy" className="text-blue-500">Privacy Policy</a> |
                        <a href="https://github.com/Dreaca" className="text-blue-500"> Contact Us</a>
                    </p>
                </footer>
            </div>
        </section>
    );
}