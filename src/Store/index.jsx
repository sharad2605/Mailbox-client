import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import  emailSliceReducer  from "./emailSlice";



const store = configureStore({
    reducer:{
        auth:authSliceReducer, email: emailSliceReducer,
        
    }
})

export default store;