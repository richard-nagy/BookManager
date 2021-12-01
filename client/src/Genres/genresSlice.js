import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
    genres: {},
    status: "idle",
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
        updateGenre: (state, action) => {
            // Update genre in redux
            state.genres[action.payload.id] = action.payload;
        },
        deleteGenre: (state, action) => {
            // Delete selected row in redux
            delete state.genres[action.payload];
        },
    },
    extraReducers(builder) {
        builder
            // Loading request
            .addCase(fetchGenres.pending, (state, action) => {
                state.status = "loading";
            })
            // Successful request
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.genres = action.payload;
            })
            // Failed request
            .addCase(fetchGenres.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const { updateGenre, deleteGenre } = genresSlice.actions;
export const selectGenres = (state) => state.genres.genres;
export default genresSlice.reducer;
