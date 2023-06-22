
import { createSlice } from "@reduxjs/toolkit";
import lideConfig from "../../config/life-game-config.json"

const dimension = lideConfig.dimension;

function getSize() {
    return Math.min(window.innerHeight, window.innerWidth) / dimension - 2;
}

const initialState: {size: number} = {
    size: getSize()
}

const slice = createSlice ({
    initialState: initialState,
    name: "sizeState",
    reducers: {
        setSize: (state) => {
            state.size = getSize();
        }
    }
});

export const sizeActions = slice.actions;
export const sizeReducer = slice.reducer;