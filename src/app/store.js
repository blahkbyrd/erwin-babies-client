import { configureStore } from '@reduxjs/toolkit';

import userReducer from "../features/usersSlice";
import albumReducer from "../features/albumSlice";
import imagesReucer from "../features/imageSlice";
import commentReducer from "../features/commentSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        album: albumReducer,
        image: imagesReucer,
        comment: commentReducer,
    }
})