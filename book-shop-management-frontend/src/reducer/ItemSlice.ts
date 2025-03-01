import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Item} from "../models/Item.ts";
import axios from "axios";



const initialState = {
    items: [{}],
}
const api = axios.create({
    baseURL: 'http://localhost:3000/item',
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

export const saveItem=createAsyncThunk(
    'item/saveItem',
    async (item:Item)=>{
        try{
            const response = await api.post('/add', item)
            return response.data
        }catch(error){
            alert("Could not save item! Error: "+error)
        }
    }
)
export const deleteItem =createAsyncThunk(
    'item/deleteItem',
    async (id:string)=>{
        try {
            const response = await api.delete(`/delete/${id}`)
            return response.data
        }catch (err){
            alert("Could not delete item! Error: "+err)
        }
    }
)
export const getAllItem = createAsyncThunk(
    'item/getAllItem',
    async ()=>{
        try {
            const response = await api.get('/getAll')
            return response.data
        }catch (err){
            alert("Could not get items! Error: "+err)
        }
    }
)
export const updateItem=createAsyncThunk(
    'item/updateItem',
    async (item:Item)=>{
        try{
            const response = await api.put(`/update/${item.itemCode}`,item);
            return response.data
        }catch (err){
            alert("Could not update item! Error: "+err)
        }
    }
)
const ItemSlice = createSlice({
    name:"Item",
    initialState:initialState,
    reducers:{
        /*
        ==================================
               REDUNDANT CODE BLOCK
        ==================================
        -> The following code block is redundant now because of createAsyncThunk methods
        -> Uncomment in future if needed

        */
        /*addItem:(state, {payload}) => {
            state.items.push(payload);
        },
        deleteItem:(state, {payload}) => {
            state.items = state.items.filter((item:Item) => item.itemCode !== payload.itemCode);
        },
        updateItem:(state,{payload}) => {
            state.items = state.items.map((item:Item)=>(item.itemCode === payload.itemCode)?
                {...item,
                    itemCode:payload.itemCode,
                    desc:payload.desc,
                    author:payload.author,
                    qto:payload.qto,
                    price:payload.price}:item
            );
        }*/
    },
    extraReducers:(builder)=>{
        builder
            .addCase(saveItem.fulfilled,(state,action)=>{
                state.items.push(action.payload)
            })
            .addCase(saveItem.pending,(state,action)=>{
                console.error("Pending save item ....")
            })
            .addCase(saveItem.rejected,(state,action)=>{
                console.error("Rejected save item")
            })
        builder
            .addCase(deleteItem.fulfilled,(state,action)=>{
                alert("Item deleted sccessfull!")
            })
            .addCase(deleteItem.pending,(state,action)=>{
                console.error("Delete Item pending")
            })
            .addCase(deleteItem.rejected,(state,action)=>{
                alert("Item deletion rejected")
            })
        builder
            .addCase(getAllItem.fulfilled,(state,action)=>{
                state.items = action.payload
            })
            .addCase(getAllItem.pending,(action,payload)=>{
                console.log("Get ALL pending")
            })
            .addCase(getAllItem.rejected,(state,action)=>{
                alert("Error while loading ....")
            })
        builder
            .addCase(updateItem.fulfilled,(state,action)=>{
                state.items.push(action.payload)
            })
            .addCase(updateItem.pending,(state,action)=>{
                console.log("Item update pending")
            })
            .addCase(updateItem.rejected,(state,action)=>{
                alert("Item Update rejected")
            })
    }
})
// export const {addItem, deleteItem, updateItem} = ItemSlice.actions;
export default ItemSlice.reducer;