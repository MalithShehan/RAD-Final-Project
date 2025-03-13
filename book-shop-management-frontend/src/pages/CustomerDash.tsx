import { useDispatch, useSelector } from "react-redux";
import { Customer } from "../models/Customer.ts";
import SearchBar from "../components/SerchBar.tsx";
import { useEffect, useState } from "react";
import AddCustomerModal from "../components/AddCustomer.tsx";
import UpdateCustomerModal from "../components/UpdateCustomer.tsx";
import { Appdispatch } from "../store/store.tsx";
import { getAllCustomer } from "../reducer/CustomerSlice.ts";

export function CustomerDash() {
    const customers = useSelector((state) => state.customer.customers);
    const dispatch = useDispatch<Appdispatch>();

    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllCustomer());
    }, [dispatch]);

    const filteredCustomers = customers.filter((customer: Customer) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            customer.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            customer.address?.toLowerCase().includes(lowerCaseSearchTerm) ||
            customer.phone?.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    function handleSearch() {
        if (searchTerm) {
            setSearchTerm(searchTerm);
        }
    }

    function showAddCustomer() {
        setAddModalOpen(true);
    }

    function showUpdateCustomer(customer: Customer) {
        setSelectedCustomer(customer);
        setUpdateModalOpen(true);
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen "
             style={{ background: 'linear-gradient(to right, #ccff66, #ffff66)' }}
        >
            {/* Header Section */}
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Customer Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage and review all customers in one place</p>
            </div>

            {/* Search and Actions Section */}
            <div className="flex justify-between items-center mb-6">
                <SearchBar
                    handleSearch={handleSearch}
                    setSearchTerm={setSearchTerm}
                    handleModal1={showAddCustomer}
                />
            </div>

            {/* Table Section */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-sky-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer: Customer) => (
                        <tr
                            key={customer.id}
                            className="hover:bg-sky-100 cursor-pointer transition-all duration-200"
                            onClick={() => showUpdateCustomer(customer)}
                        >
                            <td className="px-6 py-4 text-sm text-gray-700">{customer.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{customer.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{customer.address}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{customer.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <AddCustomerModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            <UpdateCustomerModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                selectedCustomer={selectedCustomer}
            />
        </div>
    );
}
