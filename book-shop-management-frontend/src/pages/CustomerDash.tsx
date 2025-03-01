import {useDispatch, useSelector} from "react-redux";
import {Customer} from "../models/Customer.ts";
import SearchBar from "../components/SerchBar.tsx";
import {useEffect, useState} from "react";
import AddCustomerModal from "../components/AddCustomer.tsx";
import UpdateCustomerModal from "../components/UpdateCustomer.tsx";
import {Appdispatch} from "../store/store.tsx";
import {getAllCustomer} from "../reducer/CustomerSlice.ts";

export function CustomerDash() {
    const customers = useSelector(state => state.customer.customers)

    const dispatch = useDispatch<Appdispatch>();

    const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

    const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

    const [selectedCustomer,setSelectedCustomer] = useState<Customer | null>(null);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch (getAllCustomer())
    },[dispatch])

    function handleSearch() {
        if(searchTerm){
            setSearchTerm(searchTerm);
        }
    }
    function showAddCustomer() {
        setAddModalOpen(true);
    }
    function showUpdateCustomer(customer: Customer) {
        setSelectedCustomer(customer)
        setUpdateModalOpen(true);

    }
    const filteredCustomers = customers.filter((customer:Customer) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            customer.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            customer.address?.toLowerCase().includes(lowerCaseSearchTerm) ||
            customer.phone?.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="p-4 text-4xl font-light mb-6 text-gray-900">Customers</h1>
            </div>
            <div>
                <SearchBar handleSearch={handleSearch} setSearchTerm={setSearchTerm} handleModal1={showAddCustomer}/>
            </div>
            <table className="table-auto border-2 border-sky-400 w-full">
                <thead className="bg-sky-200">
                <tr>
                    <td>Name</td>
                    <td>Address</td>
                    <td>Phone</td>
                </tr>
                </thead>
                <tbody>
                {
                    filteredCustomers.map((customer:Customer) => (
                        <tr key={customer.id} onClick={() => showUpdateCustomer(customer)}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>{customer.phone}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <AddCustomerModal isOpen={isAddModalOpen} onClose={()=>setAddModalOpen(false)} />
            <UpdateCustomerModal isOpen={isUpdateModalOpen}
                                 onClose={()=>setUpdateModalOpen(false)}
                                 selectedCustomer={selectedCustomer}
            />
        </>
    )
}