import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { userStateReducer } from "./slices/authenticSlice";

export const store = configureStore({
   
    reducer: {
        userState: userStateReducer
    }
})

export function useSelectorUserState() {
    return useSelector<any,any> (state => state.userState.userStatus)
}