import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../Books/booksSlice";
import genresReducer from "../Genres/genresSlice";
import publishersReducer from "../Publishers/publishersSlice";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        genres: genresReducer,
        publishers: publishersReducer,
    },
});
