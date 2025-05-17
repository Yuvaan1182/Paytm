import { createSlice } from '@reduxjs/toolkit';

const LIGHT_MODE = 'light';
const DARK_MODE = 'dark';

const getInitialTheme = () => {
  try {
    return localStorage.getItem('theme') || LIGHT_MODE;
  } catch {
    return LIGHT_MODE;
  }
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
      localStorage.setItem('theme', state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
