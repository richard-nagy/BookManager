import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: {
        0: {
            id: 0,
            title: "title0",
            author: "none",
            genreID: 0,
            publisherID: 0,
        },
        1: {
            id: 1,
            title: "title1",
            author: "none",
            genreID: 1,
            publisherID: 1,
        },
    },
};

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setTitle: (state) => {
            state.books["0"].title = "TITLE";
        },
    },
});

export const { setTitle } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export default booksSlice.reducer;
