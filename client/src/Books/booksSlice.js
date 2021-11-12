import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: {
        id: 0,
        title: "none",
        author: "none",
        genreID: 0,
        authorID: 0,
    },
};

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setTitle: (state) => {
            state.books.title = "TITLE";
        },
    },
});

export const { setTitle } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export default booksSlice.reducer;
