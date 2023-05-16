import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTab: 1 // 1 or 2
}

const profileSlice = createSlice({
    name: "PROFILE",
    initialState,
    reducers: {
        changeTab: (state, action) => {
            return { ...state, currentTab: action.payload };
        }
    }
})

export default profileSlice.reducer;
export const { changeTab } = profileSlice.actions;