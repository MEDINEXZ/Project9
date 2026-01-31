import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice.js';
import resourcesReducer from './resourcesSlice.js';
import favoritesReducer from './favoritesSlice.js';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    resources: resourcesReducer,
    favorites: favoritesReducer,
  },
});
