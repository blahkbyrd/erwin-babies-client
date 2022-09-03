import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://erwin-api.herokuapp.com/api/user/";
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user: {},
    status: user ? "connected" : "",
    message: "",
}
const config = (token) => {
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return headers;
}
/*==========ACTIONS============= */
// create user
export const createUser = createAsyncThunk('users/createUser', async (userData, thunkAPI) => {
    try {
        const payload = await axios.post(`${API_URL}register`, userData)
        console.log(payload.data);
        if (payload.data) {
            localStorage.setItem("user", JSON.stringify(payload.data.data));
        }
        return payload.data;
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        )
            || error.message
            || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

// log user
export const logUser = createAsyncThunk('users/logUser', async (userData, thunkAPI) => {
    try {
        const payload = await axios.post(`${API_URL}login`, userData);
        if (payload.data) {
            localStorage.setItem("user", JSON.stringify(payload.data.data));
        }
        console.log(payload.data);
        return payload.data;
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// delete account
export const deleteAccount = createAsyncThunk('users/deleteAccount', async (thunkAPI) => {
    try {
        const id = user.id;
        const token = user.token;
        console.log(user.id);

        const paylaod = await axios.delete(`${API_URL}delete/${id}`, config(token));
        console.log(user);
        return paylaod
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message);
        console.log(error);
        return thunkAPI.rejectWithValue(message);
    }
})
/*==========SLICES & REDUCERS===========*/

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        },
        logout: (state) =>{
            state.user = {}
            state.status=  ""
            state.message= ""
        }
    },
    extraReducers: (builder) => {
        builder
            // create user
            .addCase(createUser.pending, (state) => { state.status = "loading" })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "connected";
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed"
                console.log(action.payload);
                state.message = action.payload;
                state.user = {}
            })
            //log user
            .addCase(logUser.pending, (state) => { state.status = "loading" })
            .addCase(logUser.fulfilled, (state, action) => {
                state.status = "connected";
                console.log(action.payload.data);
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(logUser.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.payload;
                console.log(action.payload);
                state.user = {}
            })
            .addCase(deleteAccount.pending, (state) => { state.status = "loading" })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.status = "offline"
                // state.user = {};
                // state.message = action.payload.message;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.status = "failed"
                console.log(action.payload);
                state.message = action.payload;
            })
    }
})

export const { reset, logout } = userSlice.actions;
export default userSlice.reducer;

