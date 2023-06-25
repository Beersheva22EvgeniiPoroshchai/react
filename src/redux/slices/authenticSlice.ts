import {createSlice} from "@reduxjs/toolkit"


const initialState: {userStatus: string} = {
    userStatus: "unauthorized"
}

const slice = createSlice({
    initialState,
    name:"userStatusState",
    reducers: {
        setStatus: (state,data) => {
            state.userStatus = data.payload as string;
        }
    }
})

export const userStateAction = slice.actions;
export const userStateReducer = slice.reducer;