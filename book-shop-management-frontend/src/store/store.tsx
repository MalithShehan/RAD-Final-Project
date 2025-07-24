import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';


import CustomerSlice from "../reducer/CustomerSlice.ts";
import ItemSlice from "../reducer/ItemSlice.ts";
import OrderSlice from "../reducer/OrderSlice.ts";
import OrderDetailSlice from "../reducer/OrderDetailSlice.ts";
import UserSlice from "../reducer/UserSlice.ts";

const rootReducer = combineReducers({
  customer: CustomerSlice,
  item: ItemSlice,
  orders: OrderSlice,
  cart: OrderDetailSlice,
  user: UserSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type Appdispatch = typeof store.dispatch;
