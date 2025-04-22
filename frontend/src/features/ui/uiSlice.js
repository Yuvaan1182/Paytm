import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      console.log('toggle state', state.isSidebarOpen);

      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleSidebar, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
