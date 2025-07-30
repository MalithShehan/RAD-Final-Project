import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { getAllCustomer, saveCustomer } from "../reducer/CustomerSlice.ts";
import { Appdispatch } from "../store/store.tsx";
import { toast } from "react-toastify";


interface AddCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch<Appdispatch>();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple phone number validation (Sri Lankan format or international format)
        const phoneRegex = /^(\+94|0)?\d{9}$/;

        if (!phoneRegex.test(phone)) {
            toast.error("📞 Invalid phone number. Please enter a valid 10-digit number.");
            return;
        }

        const id = `CID-${v4()}`;
        const customer = {
            id,
            name,
            address,
            phone,
        };

        try {
            const result = await dispatch(saveCustomer(customer));

            if (saveCustomer.rejected.match(result)) {
                toast.error("❌ Failed to save customer. Please try again.");
            } else {
                toast.success("✅ Customer saved successfully!");
                onClose();
                await dispatch(getAllCustomer());
            }
        } catch (error) {
            console.error("Save customer error:", error);
            toast.error("Something went wrong!");
        }
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-50">
            <div
                className="bg-white p-5 rounded shadow-lg relative transform scale-95 transition-all duration-300 ease-out"
                style={{ animation: isOpen ? 'popup 0.3s ease-out' : '' }}
            >
                <h2 className="text-xl mb-4">Add Customer</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-2 mb-2 w-full"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-2 mb-2 w-full"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        className="border p-2 mb-2 w-full"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerModal;
