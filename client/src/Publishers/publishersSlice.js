import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    publisher: "none",
};

export const publishersSlice = createSlice({
    name: "publishers",
    initialState,
    reducers: {
        setPublisher: (state) => {
            state.publisher = "PUBLISHER";
        },
    },
});

export const { setPublisher } = publishersSlice.actions;
export const selectPublishers = (state) => state.publishers.publisher;
export default publishersSlice.reducer;
