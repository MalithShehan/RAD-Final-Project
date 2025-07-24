import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SerchBar.tsx";
import { useEffect, useState } from "react";
import { Item } from "../models/Item.ts";
import AddItemModal from "../components/AddItem.tsx";
import UpdateItemModal from "../components/UpdateItem.tsx";
import { Appdispatch } from "../store/store.tsx";
import { getAllItem } from "../reducer/ItemSlice.ts";

export function ItemDash() {
    const items = useSelector((state: any) => state.item.items); // Replace 'any' with 'RootState' if available
    const dispatch = useDispatch<Appdispatch>();
    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllItem());
    }, [dispatch]);

    const handleSearch = () => {
        if (searchTerm && searchTerm.length > 0) {
            setSearchTerm(searchTerm);
        }
    };

    const showAddItem = () => {
        setAddModalOpen(true);
    };

    const showUpdateItem = (item: Item) => {
        setSelectedItem(item);
        setUpdateModalOpen(true);
    };

    // ✅ Fix: protect .filter() from running on undefined
    const filteredItems = (items || []).filter((item: Item) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            item.desc?.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.author?.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.price === Number(lowerCaseSearchTerm)
        );
    });

    return (
        <div
            className="p-8 bg-gray-50 min-h-screen"
            style={{ background: 'linear-gradient(to right, #ccff66, #ffff66)' }}
        >
            {/* Header Section */}
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Items Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage and review all items in one place</p>
            </div>

            {/* Search and Actions Section */}
            <div className="flex justify-between items-center mb-6">
                <SearchBar
                    handleSearch={handleSearch}
                    setSearchTerm={setSearchTerm}
                    handleModal1={showAddItem}
                />
            </div>

            {/* Table Section */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-sky-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Book Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map((item: Item) => (
                            <tr
                                key={item.itemCode}
                                className="hover:bg-sky-100 cursor-pointer transition-all duration-200"
                                onClick={() => showUpdateItem(item)}
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">{item.desc}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.author}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.qto}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AddItemModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
            />
            <UpdateItemModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                selectedItem={selectedItem}
            />
        </div>
    );
}
