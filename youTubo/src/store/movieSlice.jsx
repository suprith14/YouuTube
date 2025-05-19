import { createSlice } from "@reduxjs/toolkit";



const movieSlice = createSlice({
    name: "movie",
    initialState: {
        popularMovies: []


    },
    reducers: {
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload

        }

    },
})
export default movieSlice.reducer;
export const { addPopularMovies } = movieSlice.actions;