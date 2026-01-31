import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  theme: 'light',
  currency: 'USD'
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
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    }
  }
});

export const { toggleModal, openModal, closeModal, setTheme, toggleTheme, setCurrency } = uiSlice.actions;
export default uiSlice.reducer;
