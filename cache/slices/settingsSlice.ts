import { createSlice } from "@reduxjs/toolkit";

export interface settingsState {
    serverIp: string | null;
}

const initialState: settingsState = {
    serverIp: null
}

const settingsSlice = createSlice({
    name: 'settingsState',
    initialState,
    reducers: {
        setServerIp: (state, action) => {
            state.serverIp = action.payload;
            console.log("serverIp set: ", action.payload);
        }
    }
});

export const {setServerIp} = settingsSlice.actions;

export default settingsSlice.reducer;