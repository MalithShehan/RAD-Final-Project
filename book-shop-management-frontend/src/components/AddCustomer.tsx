import React, {useState} from 'react';
import {useDispatch} from "react-redux";
// import {addCustomer} from "../reducer/CustomerSlice.ts";
import {v4} from "uuid";
import {getAllCustomer, saveCustomer} from "../reducer/CustomerSlice.ts";
import {Appdispatch} from "../store/store.tsx";


interface AddCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
    const [name,setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch<Appdispatch>();
    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = `CID-${v4()}`;
        const customer = {
            id,
            name,
            address,
            phone,
        }
        await dispatch(saveCustomer(customer))
        onClose();
        await dispatch(getAllCustomer())
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-xl mb-4">Add Customer</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" className="border p-2 mb-2 w-full"
                           required onChange={(e)=>setName(e.target.value)} />
                    <input type="text" placeholder="Address" className="border p-2 mb-2 w-full"
                           required onChange={(e)=>setAddress(e.target.value)} />
                    <input type="tel" placeholder="Phone" className="border p-2 mb-2 w-full"
                           required onChange={(e)=>setPhone(e.target.value)} />
                    <div className="flex justify-end">
                        <button type="button" className="mr-2" onClick={onClose}>Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerModal;