import {createSlice} from "@reduxjs/toolkit";
import {CartItem} from "../models/CartItem.ts";

const initialstate ={
    cartItems:[]
}
const OrderDetailSlice = createSlice({
    name:'cart',
    initialState:initialstate,
    reducers:{
        addToCart(state, {payload}){
            state.cartItems.push(payload);
        },
        deleteFromCart(state, {payload}){
            state.cartItems = state.cartItems.filter((item:CartItem) => item.itemCode !== payload.itemCode);
        },
        updateCart(state, {payload}){
            state.cartItems = state.cartItems.map((item:CartItem) => (item.itemCode === payload.itemCode)?
                {...item, itemCode:payload.itemCode, unitPrice:payload.unitPrice,
                    desc:payload.desc,
                    qty:payload.qty,
                    subTotal:payload.subTotal}:item
            );
        },
        clearCart(state){
            state.cartItems = []
        }
    }
})
export const {addToCart,deleteFromCart,updateCart,clearCart} = OrderDetailSlice.actions;
export default OrderDetailSlice.reducer;