import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Customer} from "../models/Customer.ts";
import axios from 'axios'

const initialState = {
    customers: [{}] ,
}
const api = axios.create({
    baseURL: 'http://localhost:3000/customer',
    withCredentials: true
})
api.interceptors.request.use(config=>{
    const token = sessionStorage.getItem("access-token");
    if(token){
        config.headers.Authorization ='Bearer '+token;
    }
    return config;
},
    error => {
    return Promise.reject(error);
    }
)

//Add customer
export const saveCustomer = createAsyncThunk(
    'customers/addCustomer',
    async (customer:Customer)=>{
        try {
            const response = await api.post('/add',customer)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
export const getAllCustomer = createAsyncThunk(
    'customers/getAllCustomer',
    async ()=>{
        try {
            const response = await api.get('/getAll')
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (id:string)=>{
        try {
            const response = await api.delete(`/delete/${id}`)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async (customer:Customer)=>{
        try {
            const response = await api.put(`/update/${customer.id}`,customer)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)

const CustomerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {

        /*
        ==================================
               REDUNDANT CODE BLOCK
        ==================================
        -> The following code block is redundant now because of createAsyncThunk methods
        -> Uncomment in future if needed

        */
        /*

        addCustomer: (state, {payload}) => {
            state.customers.push(payload);
        },
        deleteCustomer: (state, {payload}) => {
            state.customers = state.customers.filter((customer:Customer) => customer.id !== payload.id);
        },
        updateCustomer: (state, action) => {
            state.customers = state.customers.map((customer:Customer) =>
                customer.id === action.payload.id ?
                    {...customer, id: action.payload.id,
                        name: action.payload.name,
                        address: action.payload.address,
                        phone: action.payload.phone}
                    :customer
            )
        }*/
    },extraReducers:(builder)=>{
        //saveCustomer

        builder
            .addCase(saveCustomer.fulfilled,(state,action)=>{
                state.customers.push(action.payload)
            })
            .addCase(saveCustomer.pending,(state,action)=>{
                console.error("Pending Add Customer ....")
            })
            .addCase(saveCustomer.rejected,(state,action)=>{
                console.error("Customer Save Failed")
            })
        builder
            .addCase(deleteCustomer.fulfilled,(state,action)=>{
                alert("Customer Deleted Successfully !")
            })
            .addCase(deleteCustomer.pending,(state,action)=>{
                console.log("Pending delete...")
            })
            .addCase(deleteCustomer.rejected,(state,action)=>{
                console.log("rejected")
            })
        builder
            .addCase(getAllCustomer.fulfilled,(state,action)=>{
                state.customers = action.payload
            })
            .addCase(getAllCustomer.pending,(state,action)=>{
            })
            .addCase(getAllCustomer.rejected,(state,action)=>{
                console.error("Rejected All customer")
            })
        builder
            .addCase(updateCustomer.fulfilled,(state,action)=>{
                state.customers.push(action.payload)
            })
            .addCase(updateCustomer.pending,()=>{
                console.error("Update pending")
            })
            .addCase(updateCustomer.rejected,()=>{
                console.error("Update Customer Rejected")
            })
    }
});

// export const { addCustomer,deleteCustomer,updateCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;