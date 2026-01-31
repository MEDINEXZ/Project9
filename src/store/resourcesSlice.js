import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResources = createAsyncThunk(
  'resources/fetchResources',
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      const callbackName = 'carQueryCallback' + Date.now();
      
      window[callbackName] = (data) => {
        if (data.Makes) {
          resolve(data.Makes.slice(0, 10));
        } else {
          reject(new Error('Не вдалося завантажити дані'));
        }
        delete window[callbackName];
        document.body.removeChild(script);
      };
      
      const script = document.createElement('script');
      script.src = `https://www.carqueryapi.com/api/0.3/?callback=${callbackName}&cmd=getMakes`;
      script.onerror = () => {
        reject(new Error('Помилка завантаження даних'));
        delete window[callbackName];
        document.body.removeChild(script);
      };
      
      document.body.appendChild(script);
    }).catch((error) => rejectWithValue(error.message));
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setResources: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearResources: (state) => {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Помилка завантаження';
      });
  }
});

export const {
  setLoading,
  setResources,
  setError,
  clearResources
} = resourcesSlice.actions;

export default resourcesSlice.reducer;
