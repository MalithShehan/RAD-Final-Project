import { Link } from "react-router-dom"; // Corrected import
import { FaHome, FaUser, FaBox, FaShoppingCart, FaPlus } from "react-icons/fa";
import "../assets/Navigation.css";

export function Navigation() {
    return (
        <header className="backdrop-blur-10 shadow-md sticky top-0 z-50">
            <nav className="px-4 py-3 max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link
                        className="custom-link font-bold font-serif text-2xl flex items-center space-x-2 text-white hover:text-yellow-200 transition"
                        to="/"
                    >
                        <FaHome className="text-yellow-300" />
                        <span>Book Shop</span>
                    </Link>

                    {/* Main Navigation */}
                    <div className="hidden md:flex space-x-8 font-semibold items-center text-white">
                        <Link className="custom-link flex items-center space-x-2 hover:text-yellow-200" to="/">
                            <FaHome />
                            <span>Home</span>
                        </Link>
                        <Link className="custom-link flex items-center space-x-2 hover:text-yellow-200" to="customer">
                            <FaUser />
                            <span>Customer</span>
                        </Link>
                        <Link className="custom-link flex items-center space-x-2 hover:text-yellow-200" to="items">
                            <FaBox />
                            <span>Item</span>
                        </Link>
                        <Link className="custom-link flex items-center space-x-2 hover:text-yellow-200" to="orders">
                            <FaShoppingCart />
                            <span>Orders</span>
                        </Link>
                        <Link className="custom-link flex items-center space-x-2 hover:text-yellow-200" to="orderdetail">
                            <FaPlus />
                            <span>New Orders</span>
                        </Link>
                    </div>

                    {/* New Order Button (floating for mobile) */}
                    <Link
                        to="/orderdetail"
                        className="md:hidden fixed bottom-4 right-4 bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-yellow-500 transition flex items-center justify-center"
                        title="New Order"
                    >
                        <FaPlus className="text-xl" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}
