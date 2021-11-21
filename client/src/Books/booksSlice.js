import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
    books: {},
    status: "idle",
};

export const fetchPosts = createAsyncThunk("books", async (url) => {
    if (url) {
        // Mock Axios request
        const response = await Axios.get(url);
        return response.data.books;
    } else {
        // Real Axios request
        const response = await Axios.get("http://localhost:3001/books");
        return response.data;
    }
});

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        updateRow: (state, action) => {
            // Update selected row in redux
            state.books[action.payload.id - 1] = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.books = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const { updateRow } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export default booksSlice.reducer;
