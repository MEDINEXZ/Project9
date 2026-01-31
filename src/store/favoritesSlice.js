import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  comparison: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    addToComparison: (state, action) => {
      const exists = state.comparison.find(item => item.id === action.payload.id);
      if (!exists && state.comparison.length < 3) {
        state.comparison.push(action.payload);
      }
    },
    removeFromComparison: (state, action) => {
      state.comparison = state.comparison.filter(item => item.id !== action.payload);
    },
    clearComparison: (state) => {
      state.comparison = [];
    }
  }
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  addToComparison,
  removeFromComparison,
  clearComparison
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
