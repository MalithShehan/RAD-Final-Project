// src/components/UpdateCustomerModal.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Customer } from "../models/Customer.ts";
import { Appdispatch } from "../store/store.tsx";
import { deleteCustomer, getAllCustomer, updateCustomer } from "../reducer/CustomerSlice.ts";
import { toast } from "react-toastify";

interface UpdateCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCustomer: Customer | null;
}

const UpdateCustomerModal: React.FC<UpdateCustomerModalProps> = ({ isOpen, onClose, selectedCustomer }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const dispatch = useDispatch<Appdispatch>();

    useEffect(() => {
        if (selectedCustomer) {
            setId(selectedCustomer.id);
            setName(selectedCustomer.name);
            setPhone(selectedCustomer.phone);
            setAddress(selectedCustomer.address);
        }
    }, [selectedCustomer]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Phone number validation: allows 10 digits starting with 0 or international format
        const phoneRegex = /^(\+94|0)?\d{9}$/;

        if (!phoneRegex.test(phone)) {
            toast.error("📞 Invalid phone number. Please enter a valid 10-digit number.");
            return;
        }

        const customer = {
            id,
            name,
            address,
            phone,
        };

        try {
            const result = await dispatch(updateCustomer(customer));

            if (updateCustomer.rejected.match(result)) {
                toast.error("❌ Failed to update customer. Please try again.");
            } else {
                toast.success("✅ Customer updated successfully!");
                onClose();
                await dispatch(getAllCustomer());
            }
        } catch (error) {
            console.error("Update customer error:", error);
            toast.error("Something went wrong while updating the customer.");
        }
    };

    const handleDelete = async () => {
        if (!selectedCustomer) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete customer "${selectedCustomer.name}"?`
        );

        if (!confirmDelete) return;

        try {
            const result = await dispatch(deleteCustomer(selectedCustomer.id));

            if (deleteCustomer.rejected.match(result)) {
                toast.error("❌ Failed to delete customer. Please try again.");
            } else {
                toast.success("🗑️ Customer deleted successfully!");
                onClose();
                await dispatch(getAllCustomer());
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong while deleting the customer.");
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            {/* Background Overlay with Blur Effect */}
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

            {/* Modal Content with Animation */}
            <div className="bg-white p-5 rounded shadow-lg transform transition-all duration-300 scale-95 hover:scale-100">
                <h2 className="text-xl mb-4">Update Customer</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        className="border p-2 mb-2 w-full"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        value={address}
                        className="border p-2 mb-2 w-full"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="tel"
                        value={phone}
                        className="border p-2 mb-2 w-full"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            className="mr-2 p-2 border rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCustomerModal;
