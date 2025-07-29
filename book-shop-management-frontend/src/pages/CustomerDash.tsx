import { useDispatch, useSelector } from "react-redux";
import { Customer } from "../models/Customer.ts";
import SearchBar from "../components/SerchBar.tsx";
import { useEffect, useState } from "react";
import AddCustomerModal from "../components/AddCustomer.tsx";
import UpdateCustomerModal from "../components/UpdateCustomer.tsx";
import { Appdispatch } from "../store/store.tsx";
import { getAllCustomer } from "../reducer/CustomerSlice.ts";

export function CustomerDash() {
    const customers = useSelector((state: any) => state.customer.customers) || [];
    const dispatch = useDispatch<Appdispatch>();

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllCustomer());
    }, [dispatch]);

    const filteredCustomers = customers.filter((customer: Customer) => {
        const lowerTerm = searchTerm.toLowerCase();
        return (
            customer.name?.toLowerCase().includes(lowerTerm) ||
            customer.address?.toLowerCase().includes(lowerTerm) ||
            customer.phone?.toLowerCase().includes(lowerTerm)
        );
    });

    function handleSearch() {
        if (searchTerm) setSearchTerm(searchTerm);
    }

    function showAddCustomer() {
        setAddModalOpen(true);
    }

    function showUpdateCustomer(customer: Customer) {
        setSelectedCustomer(customer);
        setUpdateModalOpen(true);
    }

    return (
        <div className="p-8 min-h-screen text-gray-800" style={{ background: 'linear-gradient(to right, #43cea2, #185a9d)' }}>
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white drop-shadow">👥 Customer Dashboard</h1>
                <p className="text-gray-200 mt-2 text-lg">Manage and review all customers efficiently</p>
            </div>

            {/* Search + Action */}
            <div className="flex justify-between items-center mb-6">
                <SearchBar
                    handleSearch={handleSearch}
                    setSearchTerm={setSearchTerm}
                    handleModal1={showAddCustomer}
                />
            </div>

            {/* Table */}
            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Customer ID</th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Address</th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Phone</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCustomers.map((customer: Customer) => (
                            <tr
                                key={customer.id}
                                className="hover:bg-indigo-100 cursor-pointer transition-all duration-200"
                                onClick={() => showUpdateCustomer(customer)}
                            >
                                <td className="px-6 py-4 text-sm">{customer.id}</td>
                                <td className="px-6 py-4 text-sm">{customer.name}</td>
                                <td className="px-6 py-4 text-sm">{customer.address}</td>
                                <td className="px-6 py-4 text-sm">{customer.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AddCustomerModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            <UpdateCustomerModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                selectedCustomer={selectedCustomer}
            />
        </div>
    );
}
