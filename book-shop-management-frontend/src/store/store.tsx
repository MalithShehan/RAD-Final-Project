import { configureStore } from '@reduxjs/toolkit';
import CustomerSlice from "../reducer/CustomerSlice.ts";
import ItemSlice from "../reducer/ItemSlice.ts";
import OrderSlice from "../reducer/OrderSlice.ts";
import OrderDetailSlice from "../reducer/OrderDetailSlice.ts";
import UserSlice from "../reducer/UserSlice.ts";
// import orderReducer from './orderSlice'; // Create this slice

export const store = configureStore({
    reducer: {
        customer: CustomerSlice,
        item: ItemSlice,
        orders: OrderSlice,
        cart:OrderDetailSlice,
        user: UserSlice,
    },
});
export type Appdispatch = typeof store.dispatch;