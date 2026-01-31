import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  theme: 'light'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
});

export const { toggleModal, openModal, closeModal, setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
