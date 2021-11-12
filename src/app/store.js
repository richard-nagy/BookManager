import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Counters/counterSlice";
import booksReducer from "../Books/booksSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        books: booksReducer,
        genres: counterReducer,
        publishers: counterReducer,
    },
});
