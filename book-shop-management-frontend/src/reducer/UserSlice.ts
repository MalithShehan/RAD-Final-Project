import axios from "axios";
import {User} from "../models/User.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    jwt_token: null,
    refresh_token : null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: '',
};

const api = axios.create({
    baseURL:"http://localhost:3000"
})
export const registerUser= createAsyncThunk(
    'user/register',
    async (user : User)=>{
        try{
            const response = await api.post('/auth/register', {user},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
export const loginUser= createAsyncThunk(
    'user/login',
    async (user : User)=>{
        try{
            const response = await api.post('/auth/login', {user},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers:{
        logOutUser(state){
            state.isAuthenticated = false;
            sessionStorage.removeItem('access-token');
        }
    },
    extraReducers(builder){
        builder
            .addCase(registerUser.pending,(state, action)=>{
                console.log('Hello World');
            })
            .addCase(registerUser.fulfilled,(state, action)=>{
                console.log('User Registered Successfully');
            })
            .addCase(registerUser.rejected,(state, action)=>{
                state.error = action.payload as string;
            });
        builder
            .addCase(loginUser.rejected,(state, action)=>{
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled,(state, action)=>{
                state.jwt_token = action.payload.accessToken;
                sessionStorage.setItem("access-token",action.payload.accessToken)
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.pending,(state, action)=>{
                state.isAuthenticated = false;
            })

    }
});
export const {logOutUser} = userSlice.actions;
export default userSlice.reducer;