import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "../models/Item.ts";
import axios from "axios";

// Initial State
const initialState = {
  items: [] as Item[],
};

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/item",
});

// Attach token from sessionStorage before each request
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access-token");
    console.log("Attaching token:", token); // Debug log
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thunks

export const saveItem = createAsyncThunk<
  Item,
  Item,
  { rejectValue: string }
>("item/saveItem", async (item, thunkAPI) => {
  try {
    const response = await api.post("/add", item);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || "Could not save item");
  }
});

export const deleteItem = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("item/deleteItem", async (id, thunkAPI) => {
  try {
    await api.delete(`/delete/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || "Could not delete item");
  }
});

export const getAllItem = createAsyncThunk<
  Item[],
  void,
  { rejectValue: string }
>("item/getAllItem", async (_, thunkAPI) => {
  try {
    const response = await api.get("/getAll");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || "Could not fetch items");
  }
});

export const updateItem = createAsyncThunk<
  Item,
  Item,
  { rejectValue: string }
>("item/updateItem", async (item, thunkAPI) => {
  try {
    const response = await api.put(`/update/${item.itemCode}`, item);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || "Could not update item");
  }
});

// Slice

const ItemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // saveItem
      .addCase(saveItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(saveItem.rejected, (_, action) => {
        alert(action.payload || "Save failed");
      })

      // deleteItem
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.itemCode !== action.payload);
        alert("Item deleted successfully!");
      })
      .addCase(deleteItem.rejected, (_, action) => {
        alert(action.payload || "Delete failed");
      })

      // getAllItem
      .addCase(getAllItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getAllItem.rejected, (_, action) => {
        alert(action.payload || "Failed to load items");
      })

      // updateItem
      .addCase(updateItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.items = state.items.map((item) =>
          item.itemCode === updatedItem.itemCode ? updatedItem : item
        );
      })
      .addCase(updateItem.rejected, (_, action) => {
        alert(action.payload || "Update failed");
      });
  },
});

export default ItemSlice.reducer;
