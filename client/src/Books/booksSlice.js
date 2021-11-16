import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

let initialState = {
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
        console.log(response.data);
        return response.data;
    }
});

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setTitle: (state) => {
            state.books["0"].title = "TITLE"; // Update title of the first row
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

export const { setTitle } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export default booksSlice.reducer;
