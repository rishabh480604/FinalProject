import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';

const store = configureStore(
    {
        //add reducer obj name
        reducer:authReducer
    }
);
export default store;