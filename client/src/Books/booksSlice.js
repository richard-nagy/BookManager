import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
    books: {},
    status: "idle",
};

// Fetch data into redux
export const fetchBooks = createAsyncThunk("books", async (url) => {
    const response = await Axios.get("http://localhost:3001/booksSelect");
    const object = {};
    for (const [key, value] of Object.entries(response.data)) {
        object[value.id] = value;
    }
    return object;
});

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        updateRow: (state, action) => {
            // Update selected row in redux
            state.books[action.payload.id] = action.payload;
        },
        deleteRow: (state, action) => {
            // Delete selected row in redux
            delete state.books[action.payload];
        },
    },
    extraReducers(builder) {
        builder
            // Loading request
            .addCase(fetchBooks.pending, (state, action) => {
                state.status = "loading";
            })
            // Successful request
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.books = action.payload;
            })
            // Failed request
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const { updateRow, deleteRow } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export default booksSlice.reducer;
