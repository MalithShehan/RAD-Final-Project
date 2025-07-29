import axios from "axios";
import { User } from "../models/User.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  jwt_token: string | null;
  refresh_token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  jwt_token: null,
  refresh_token: null,
  username: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const registerUser = createAsyncThunk<
  any,
  User,
  { rejectValue: string }
>(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", { user }, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      // Extract error message safely
      const message =
        error.response?.data?.error ||
        error.message ||
        "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk<
  any,
  User,
  { rejectValue: string }
>(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", { user }, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    logOutUser(state) {
      state.isAuthenticated = false;
      state.jwt_token = null;
      state.refresh_token = null;
      state.username = null;
      state.error = null;
      sessionStorage.removeItem("access-token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
       state.jwt_token = action.payload.accessToken;
        sessionStorage.setItem("access-token", action.payload.accessToken);
        state.refresh_token = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = "Password or Username is wrong, try again";
        state.isAuthenticated = false;
      });
  },
});

export const { logOutUser, clearError } = userSlice.actions;
export default userSlice.reducer;
