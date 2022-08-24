import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import imageService from "./imageService";


const config = (token) => {
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return headers;
}
// constants
const API_URL = "https://erwin-babies-api.herokuapp.com/api/images/";

const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
   url:"",
   loading:"",
   error:"",
   message:""
}

/*=====ACTIONS=====*/

// upload multiple images
export const uploadingProfileImage = createAsyncThunk('image/uploadingProfileImage', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token;
        const userId = thunkAPI.getState().user.user.id;
        console.log(data);
        const payloadImage = await axios.patch(`${API_URL}/profile/upload/${userId}`, data, config(token))
        /*----DEBUG----*/
        console.log(`from imageSlice - uploadingImage => data: ${data}`);
        console.log(`from imageSlice - uploadingImage => payload: ${payloadImage}`);
        /*----DEBUG----*/
        
        return payloadImage;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message);
        console.log(`from imageSlice - uploadingImage => error: ${error}`);
        return thunkAPI.rejectWithValue(message);
    }
})



/*=====SLICE & REDUCERS=====*/
export const imagesSlice = createSlice(
    {
        name: "image",
        initialState,
        reducers: {
            reset: (state)=>state={
                loading:"",
                error:"",
                message:""
            }
        },
        extraReducers: (builder)=>{
            builder
                .addCase(uploadingProfileImage.pending, (state, action)=>{
                    state.loading =true
                /*----DEBUG----*/
                console.log(`from imageSlice - reducers-pending => action: ${action}`);
                /*----DEBUG----*/
                })
                .addCase(uploadingProfileImage.fulfilled, (state, action)=>{
                    state.loading =false;
                    state.url = action.payload;
                    state.message = action.payload.message;
                    /*----DEBUG----*/
                    console.log(`from imageSlice - reducers-fullfilled => action: ${action.payload}`);
                    /*----DEBUG----*/

                })
                .addCase(uploadingProfileImage.rejected, (state,action)=>{
                    state.error = true;
                    state.value = null;
                    state.message = action.payload.message
                })
        }
    }
)

export const {reset} = imagesSlice.actions;
export default imagesSlice.reducer;