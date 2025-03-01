import { Link } from "react-router";
import "../assets/Navigation.css";

export function Navigation() {
    return (
        <>
            <header className="bg-gray-700/100 shadow-lg">
                <nav className="px-4 py-3">
                    <div className="flex justify-between items-center">
                        <Link className="custom-link !important font-bold font-serif text-2xl" to="/" >Simplify</Link>
                        <div className="flex space-x-10">
                            <Link className="custom-link" to="/">Home</Link>
                            <Link className="custom-link" to="customer">Customer</Link>
                            <Link className="custom-link" to="items">Item</Link>
                            <Link className="custom-link" to="orders">Orders</Link>
                            <Link className="custom-link" to="orders">New Orders</Link>

                            <Link to="orderdetail" className="fixed top-3 right-4 bg-blue-500 text-white p-3 rounded shadow-lg hover:bg-blue-600 transition">
                                New Order
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    );
}