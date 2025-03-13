import { Link } from "react-router";
import { FaHome, FaUser, FaBox, FaShoppingCart, FaPlus } from "react-icons/fa";
import "../assets/Navigation.css";

export function Navigation() {
    return (
        <>
            <header className="bg-[#2aa2a2] shadow-lg">
                <nav className="px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo/Brand Name */}
                        <Link className="custom-link font-bold font-serif text-2xl flex items-center space-x-2" to="/">
                            <FaHome className="text-blue-600 mr-2" />
                            <span>Book Shop</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex space-x-10 font-bold items-center">
                            <Link className="custom-link flex items-center space-x-2" to="/">
                                <FaHome className="text-blue-600" />
                                <span>Home</span>
                            </Link>
                            <Link className="custom-link flex items-center space-x-2" to="customer">
                                <FaUser className="text-blue-600" />
                                <span>Customer</span>
                            </Link>
                            <Link className="custom-link flex items-center space-x-2" to="items">
                                <FaBox className="text-blue-600" />
                                <span>Item</span>
                            </Link>
                            <Link className="custom-link flex items-center space-x-2" to="orders">
                                <FaShoppingCart className="text-blue-600" />
                                <span>Orders</span>
                            </Link>
                            <Link className="custom-link flex items-center space-x-2" to="orders">
                                <FaPlus className="text-blue-600" />
                                <span>New Orders</span>
                            </Link>

                            {/* Special New Order Button */}
                            <Link
                                to="orderdetail"
                                className="fixed top-3 right-4 bg-blue-500 text-white p-3 rounded shadow-lg hover:bg-blue-600 transition flex items-center space-x-2"
                            >
                                <FaPlus className="mr-2" />
                                <span>New Order</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
