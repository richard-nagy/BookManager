import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
    publishers: {},
    status: "idle",
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
        updatePublisher: (state, action) => {
            // Update publisher in redux
            state.publishers[action.payload.id] = action.payload;
        },
        deletePublisher: (state, action) => {
            // Delete publisher from redux
            delete state.publishers[action.payload];
        },
    },
    extraReducers(builder) {
        builder
            // Loading request
            .addCase(fetchPublishers.pending, (state, action) => {
                state.status = "loading";
            })
            // Successful request
            .addCase(fetchPublishers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.publishers = action.payload;
            })
            // Failed request
            .addCase(fetchPublishers.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const { updatePublisher, deletePublisher } = publishersSlice.actions;
export const selectPublishers = (state) => state.publishers.publishers;
export default publishersSlice.reducer;
