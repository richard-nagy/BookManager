import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    author: "none",
};

export const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        setAuthor: (state) => {
            state.author = "AUTHOR";
        },
    },
});

export const { setAuthor } = authorsSlice.actions;
export const selectAuthors = (state) => state.authors.author;
export default authorsSlice.reducer;
