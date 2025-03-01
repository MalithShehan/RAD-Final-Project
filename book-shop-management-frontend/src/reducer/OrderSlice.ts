import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Order} from "../models/Order.ts";
import axios from "axios";

const initalstste={
    orders : [{}]
}
const api = axios.create({
    baseURL: "http://localhost:3000/orders"
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
export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async (order:Order)=>{
        try {
            const response = await api.post('/add',order)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
export const getAllOrders = createAsyncThunk(
    'orders/getAllOrders',
    async ()=>{
        try {
            const response = await api.get('/getAll')
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (id:string)=>{
        try {
            const response = await api.delete(`/delete/${id}`)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
const OrderSlice = createSlice({
    name:'orders',
    initialState:initalstste,
    reducers:{
        /*
        ==================================
               REDUNDANT CODE BLOCK
        ==================================
        -> The following code block is redundant now because of createAsyncThunk methods
        -> Uncomment in future if needed

        */
        /*addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter((order:Order) => order.orderId !== action.payload.orderId);
        }*/
    },
    extraReducers: (builder)=>{
        builder
            .addCase(addOrder.fulfilled,(state,action)=>{
                alert("Order Added Successfully")
            })
            .addCase(addOrder.pending,(state,action)=>{
                console.log("Add order pending...")
            })
            .addCase(addOrder.rejected,(state,action)=>{
                alert("Order rejected...")
            })
        builder
            .addCase(getAllOrders.fulfilled,(state,action)=>{
                state.orders = action.payload
            })
            .addCase(getAllOrders.pending,(state, action)=>{
                console.log("Orders pending... ")
            })
            .addCase(getAllOrders.rejected,(state, action)=>{
                alert("Request Rejected ")
            })
    }
})
// export const {addOrder, deleteOrder} = OrderSlice.actions;
export default OrderSlice.reducer;