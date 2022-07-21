import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuIsOpen: true
  },
  reducers: {
    openMenu: (state) => {
      state.menuIsOpen = true;
    },
    closeMenu: (state) => {
      state.menuIsOpen = false;
    }

  },
});

export const { openMenu, closeMenu } = uiSlice.actions;

export default uiSlice.reducer;
