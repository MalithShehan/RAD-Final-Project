import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SerchBar.tsx";
import { useEffect, useState } from "react";
import { Item } from "../models/Item.ts";
import AddItemModal from "../components/AddItem.tsx";
import UpdateItemModal from "../components/UpdateItem.tsx";
import { Appdispatch } from "../store/store.tsx";
import { getAllItem } from "../reducer/ItemSlice.ts";

export function ItemDash() {
    const items = useSelector((state: any) => state.item.items) || [];
    const dispatch = useDispatch<Appdispatch>();

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllItem());
    }, [dispatch]);

    const handleSearch = () => {
        if (searchTerm.trim()) setSearchTerm(searchTerm);
    };

    const showAddItem = () => setAddModalOpen(true);
    const showUpdateItem = (item: Item) => {
        setSelectedItem(item);
        setUpdateModalOpen(true);
    };

    const filteredItems = items.filter((item: Item) => {
        const search = searchTerm.toLowerCase();
        return (
            item.desc?.toLowerCase().includes(search) ||
            item.author?.toLowerCase().includes(search) ||
            item.price === Number(search)
        );
    });

    return (
        <div
            className="p-8 min-h-screen text-gray-800"
            style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}
        >
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white drop-shadow">📚 Items Dashboard</h1>
                <p className="text-blue-100 mt-2 text-lg">Manage and track all books & inventory</p>
            </div>

            {/* Search + Action */}
            <div className="flex justify-between items-center mb-6">
                <SearchBar
                    handleSearch={handleSearch}
                    setSearchTerm={setSearchTerm}
                    handleModal1={showAddItem}
                />
            </div>

            {/* Table */}
            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gradient-to-r from-pink-400 to-orange-400 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Book Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Author</th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Quantity</th>
                            <th className="px-6 py-3 text-left text-sm font-bold uppercase">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map((item: Item) => (
                            <tr
                                key={item.itemCode}
                                className="hover:bg-pink-100 cursor-pointer transition-all duration-200"
                                onClick={() => showUpdateItem(item)}
                            >
                                <td className="px-6 py-4 text-sm">{item.desc}</td>
                                <td className="px-6 py-4 text-sm">{item.author}</td>
                                <td className="px-6 py-4 text-sm">{item.qto}</td>
                                <td className="px-6 py-4 text-sm">Rs. {item.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AddItemModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            <UpdateItemModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                selectedItem={selectedItem}
            />
        </div>
    );
}
