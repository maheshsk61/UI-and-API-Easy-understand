import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice"
//step 1 creating store
const store=configureStore({
    reducer:{
        //step 6 setting reducer to store
        userStore:userReducer
    }
})
export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;