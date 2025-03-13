// src/components/UpdateCustomerModal.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Customer } from "../models/Customer.ts";
import { Appdispatch } from "../store/store.tsx";
import { deleteCustomer, getAllCustomer, updateCustomer } from "../reducer/CustomerSlice.ts";

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
        const customer = {
            id,
            name,
            address,
            phone,
        }
        await dispatch(updateCustomer(customer));
        onClose();
        await dispatch(getAllCustomer())
    };

    const handleDelete = async () => {
        if (selectedCustomer) {
            await dispatch(deleteCustomer(selectedCustomer.id));
        }
        onClose();
        await dispatch(getAllCustomer())
    }

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
    