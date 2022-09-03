import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*==== CONSTANT ====*/
const API_URL_ALBUM = "https://erwin-api.herokuapp.com/api/album/";
const API_LOCAL = "http://localhost:5000"

const config = (token) => {
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return headers;
}

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loading: false,
    update: false,
    albumData: [],
    message: "",
    liked: false,
    status: ""
}
/*==== ACTIONS ====*/

// display posts 

export const displayAlbum = createAsyncThunk("album/displayAlbum", async (thunkAPI) => {
    try {
        const payload = await axios.get(API_URL_ALBUM)
        return payload.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(message);
    }
})




// create album with images
export const createAlbumWithImages = createAsyncThunk('album/createImageAlbum', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token;
        const id = thunkAPI.getState().user.user._id ? thunkAPI.getState().user.user._id : thunkAPI.getState().user.user.id;
        const payload = await axios.post(`${API_URL_ALBUM}new-album-images/${id}`, data, config(token))
        return payload.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(message);
    }

})

// like album
export const likeAlbum = createAsyncThunk("album/likeAlbum", async (data, thunkAPI) => {

    try {
        const token = thunkAPI.getState().user.user.token;
        const id = thunkAPI.getState().user.user.id;
        const payload = await axios.patch(`${API_URL_ALBUM}like-album/${id}`, data, config(token));
        console.log(payload.data)
        return payload.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(message)
    }
})

// delete albums

export const deleteAlbum = createAsyncThunk('album/deleteAlbum', async (data, thunkAPI) => {
    try {
        const payload = await axios.delete(`${API_URL_ALBUM}delete-album/${data}`);
        return payload.data;

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(message);
    }
})


// update albums
export const updateAlbum = createAsyncThunk('album/updateAlbum', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token;
        const id = thunkAPI.getState().user.user._id ? thunkAPI.getState().user.user._id : thunkAPI.getState().user.user.id;
        const payload = await axios.put(`${API_URL_ALBUM}update-album/${id}`, data, config(token) )
        return payload.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message);
        return thunkAPI.rejectWithValue(message);
    }
})

/*==== SLICE ====*/

export const articleSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        reset: (state) => {
            state = {
                loading: false,
                liked: false,
                message: "",
            }
        },
        resetAll: (state) => { state = initialState }
    },
    extraReducers: (builder) => {
        builder
            .addCase(displayAlbum.pending, (state) => { state.loading = true })
            .addCase(displayAlbum.fulfilled, (state, action) => {
                state.loading = false;
                state.albumData = action.payload.albums;
                state.status = action.payload.status
            })
            .addCase(displayAlbum.rejected, (state, action) => {
                state.loading = false;
                state.albumData = [];
                state.message = action.payload;
            })
            .addCase(createAlbumWithImages.pending, (state) => { state.loading = true })
            .addCase(createAlbumWithImages.fulfilled, (state, action) => {
                state.loading = false;
                state.update = true;
                state.message = action.payload.message;
                state.status = action.payload.status
            })
            .addCase(createAlbumWithImages.rejected, (state, action) => {
                state.loading = false;
                state.albumData = [];
                state.message = action.payload.message;
            })

            .addCase(likeAlbum.pending, (state) => { state.loading = true })
            .addCase(likeAlbum.fulfilled, (state, action) => {
                state.loading = false;
                state.liked = !state.liked;
                console.log(action.payload);
                state.message = action.payload.message;
                state.status = action.payload.status

            })
            .addCase(likeAlbum.rejected, (state, action) => {
                state.loading = false;
                state.liked = false
                state.message = action.payload.message;
            })
            .addCase(deleteAlbum.pending, (state) => { state.loading = true })
            .addCase(deleteAlbum.fulfilled, (state, action) => {
                state.loading = false
                state.message = "deleted"
                state.status = action.payload.status
            })
            .addCase(deleteAlbum.rejected, (state) => {
                state.loading = false;
                state.message = "erreur";
            })
            .addCase(updateAlbum.pending, (state) => { state.loading = true })
            .addCase(updateAlbum.fulfilled, (state, action) => {
                state.loading = false
                state.message = "updated"
                state.status = action.payload.status

            })
            .addCase(updateAlbum.rejected, (state) => {
                state.loading = false;
                state.message = "erreur";
            })


    }
})

// selector
export const { reset, resetAll } = articleSlice.actions;
export default articleSlice.reducer;

