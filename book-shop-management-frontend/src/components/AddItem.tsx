import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {v4} from "uuid";
import {Appdispatch} from "../store/store.tsx";
import {getAllItem, saveItem} from "../reducer/ItemSlice.ts";

interface AddItemModalProps{
    isOpen:boolean;
    onClose:()=>void;
}

const AddItemModal:React.FC<AddItemModalProps>=({isOpen, onClose}) => {
    const dispatch = useDispatch<Appdispatch>();
    const [itemDescription, setItemDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const[quantity, setQuantity] = useState("");

    if(!isOpen) return null;

    const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const itemCode = `IID-${v4()}`
        const item = {
            itemCode:itemCode,
            desc : itemDescription,
            author : author,
            qto: Number(quantity),
            price : Number(price),
        }
        await dispatch(saveItem(item));
        onClose();
        await dispatch(getAllItem())
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-xl mb-4">Add New Item</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Book Name" className="border p-2 mb-2 w-full"
                           required onChange={(e) => setItemDescription(e.target.value)}/>
                    <input type="text" placeholder="Author Name" className="border p-2 mb-2 w-full"
                           required onChange={(e) => setAuthor(e.target.value)}/>
                    <input type="number" placeholder="Qty" className="border p-2 mb-2 w-full"
                           required onChange={(e) => setQuantity(e.target.value)}/>
                    <input type="number" placeholder="Price" className="border p-2 mb-2 w-full"
                           required onChange={(e) => setPrice(e.target.value)}/>

                    <div className="flex justify-end">
                        <button type="button" className="mr-2" onClick={onClose}>Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddItemModal;