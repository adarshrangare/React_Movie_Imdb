import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfig: (state, action) => {
      state.url = action.payload;
    //   return state.url;
    },

    getGenres: (state, action) => {
      state.genres = action.payload;
    //   return state.genres;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfig, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
