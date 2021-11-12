import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../Books/booksSlice";
import authorsReducer from "../Authors/authorsSlice";
import publishersReducer from "../Publishers/publishersSlice";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        authors: authorsReducer,
        publishers: publishersReducer,
    },
});
