import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// constants

const API_URL = "https://erwin-babies-api.herokuapp.com/api/comment/";

const config = (token) => {
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return headers;
}

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    commentValue: [],
    commentLoading: false,
    commentError: false,
    commentSuccess: false,
    commentcommentMessage: "",
}

// get com

export const getCom = createAsyncThunk('comment/getComment', async (commentData, thunkAPI) => {
    try {
        const payload = await axios.get(`https://erwin-babies-api.herokuapp.com/api/comment/get/${commentData}`)
        return payload.data;
    } catch (error) {
        console.log(error);
        const commentMessage = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(commentMessage);
    }
})

// get all comments
export const getAllComms = createAsyncThunk('comment/getAllComments', async (id, thunkAPI) => {
    try {
        const payload = await axios.get(`${API_URL}get-all/${id}`);
        return payload.data;
    } catch (error) {
        console.error(error);
        const commentMessage = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(commentMessage);
    }
})
// create com
export const createCom = createAsyncThunk('comment/createCom', async (commentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token;
        const id = thunkAPI.getState().user.user.id;
        const payload = await axios.post(`${API_URL}create/${id}`, commentData, config(token));
        return payload.data;
    } catch (error) {
        console.log(error);
        const commentMessage = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(commentMessage);
    }
})

// uncomment 
export const uncommentAlbum = createAsyncThunk('comment/uncomment', async (commentData, thunkAPI) => {
    try {
        const payload = await axios.patch(`${API_URL}uncomment/${commentData}`);
        return await payload.data;
    } catch (error) {
        console.log(error);
        const commentMessage = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(commentMessage);
    }
})

// update comment
export const updateComment = createAsyncThunk("comment/updateComment", async (commentData, thunkAPI) => {
    try {
        const payload = await axios.put(`${API_URL}edit/${commentData.id}`, commentData);
        return payload.data;
    } catch (error) {
        console.log(error);
    }
})

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        reset: (state) => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(createCom.pending, (state) => { state.commentLoading = true })
            .addCase(createCom.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.commentSuccess = true;
                state.commentValue = action.payload;
                state.commentMessage = action.payload;
            })
            .addCase(createCom.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = true;
                state.commentValue = null;
                state.commentMessage = action.payload;
            })

            .addCase(uncommentAlbum.pending, (state) => { state.commentLoading = true })
            .addCase(uncommentAlbum.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.commentSuccess = true;
                state.commentValue = action.payload;
                state.commentMessage = action.payload
            })
            .addCase(uncommentAlbum.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = true;
                state.commentValue = null;
                state.commentMessage = action.payload;
            })

            .addCase(getCom.pending, (state) => { state.commentLoading = true })
            .addCase(getCom.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.commentSuccess = true;
                state.commentValue = action.payload;
                state.commentMessage = action.payload;
            })
            .addCase(getCom.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = true;
                state.commentValue = null;
                state.commentMessage = action.payload;
            })
            .addCase(getAllComms.pending, (state) => { state.commentLoading = true })
            .addCase(getAllComms.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.commentSuccess = true;
                state.commentValue = action.payload;
                state.commentMessage = action.payload;
            })
            .addCase(getAllComms.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = true;
                state.commentValue = null;
                state.commentMessage = action.payload;
            })
            .addCase(updateComment.pending, (state) => { state.commentLoading = true })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.commentSuccess = true;
                state.commentValue = action.payload;
                state.commentMessage = action.payload;
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = true;
                state.commentValue = null;
                state.commentMessage = action.payload;
            })

    }
})

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
