import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Item } from "../models/Item.ts";
import { Appdispatch } from "../store/store.tsx";
import { deleteItem, getAllItem, updateItem } from "../reducer/ItemSlice.ts";
import { toast } from "react-toastify";



interface UpdateItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedItem: Item | null;
}

const UpdateItemModal: React.FC<UpdateItemModalProps> = ({ isOpen, onClose, selectedItem }) => {
    const dispatch = useDispatch<Appdispatch>();

    const [itemCode, setItemCode] = useState('');
    const [desc, setDesc] = useState('');
    const [author, setAuthor] = useState('');
    const [qto, setQto] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (selectedItem) {
            setItemCode(selectedItem.itemCode);
            setDesc(selectedItem.desc);
            setAuthor(selectedItem.author);
            setQto(selectedItem.qto);
            setPrice(selectedItem.price);
        }
    }, [selectedItem]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const item = {
            itemCode,
            desc,
            author,
            qto: Number(qto),
            price: Number(price),
        };

        try {
            const result = await dispatch(updateItem(item));

            if (updateItem.rejected.match(result)) {
                toast.error("❌ Failed to update item. Please try again.");
            } else {
                toast.success("✅ Item updated successfully!");
                onClose(); // close the modal if success
                await dispatch(getAllItem());
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Something went wrong!");
        }
    };

    const handleDelete = async () => {
        if (!selectedItem) return;

        try {
            const result = await dispatch(deleteItem(selectedItem.itemCode));

            if (deleteItem.rejected.match(result)) {
                toast.error("❌ Failed to delete item. Please try again.");
            } else {
                toast.success("🗑️ Item deleted successfully!");
                onClose();
                await dispatch(getAllItem());
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("An error occurred while deleting.");
        }
    };

    return (
        <>
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">

                <div className="bg-white p-5 rounded shadow-lg">
                    <h2 className="text-xl mb-4">Update Customer</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder={desc} className="border p-2 mb-2 w-full"
                            onChange={(e) => setDesc(e.target.value)} />
                        <input type="text" placeholder={author} className="border p-2 mb-2 w-full"
                            onChange={(e) => setAuthor(e.target.value)} />
                        <input type="number" placeholder={qto} className="border p-2 mb-2 w-full"
                            onChange={(e) => setQto(e.target.value)} />
                        <input type="number" placeholder={price} className="border p-2 mb-2 w-full"
                            onChange={(e) => setPrice(e.target.value)} />
                        <div className="flex justify-end">
                            <button type="button" className="mr-2" onClick={onClose}>Cancel</button>
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
                            <button type="button" className=" bg-red-500 p-2 rounded" onClick={handleDelete}>Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UpdateItemModal;