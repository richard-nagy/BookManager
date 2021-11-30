import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
    publishers: {},
};

// Fetch data into redux
export const fetchPublishers = createAsyncThunk("publishers", async () => {
    const response = await Axios.get("http://localhost:3001/publishersSelect");
    const object = {};
    for (const [key, value] of Object.entries(response.data)) {
        object[value.id] = value;
    }

    return object;
});

export const publishersSlice = createSlice({
    name: "publishers",
    initialState,
    reducers: {
        setPublisher: (state) => {
            state[1].publisher = "PUBLISHER";
        },
    },
    extraReducers(builder) {
        // Successful request
        builder.addCase(fetchPublishers.fulfilled, (state, action) => {
            state.publishers = action.payload;
        });
    },
});

export const { setPublisher } = publishersSlice.actions;
export const selectPublishers = (state) => state.publishers.publishers;
export default publishersSlice.reducer;
