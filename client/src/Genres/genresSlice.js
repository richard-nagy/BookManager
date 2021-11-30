import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
    genres: {},
};

// Fetch data into redux
export const fetchGenres = createAsyncThunk("genres", async () => {
    const response = await Axios.get("http://localhost:3001/genresSelect");
    const object = {};
    for (const [key, value] of Object.entries(response.data)) {
        object[value.id] = value;
    }
    return object;
});

export const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        setGenres: (state) => {
            state.genres = "genres";
        },
    },
    extraReducers(builder) {
        // Successful request
        builder.addCase(fetchGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
        });
    },
});

export const { setGenres } = genresSlice.actions;
export const selectGenres = (state) => state.genres.genres;
export default genresSlice.reducer;
