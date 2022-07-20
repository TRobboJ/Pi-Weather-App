import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuIsOpen: true,
    sunriseSunsetDataLastFetched: '',
    sunriseTime: new Date(),
    sunsetTime: new Date()
  },
  reducers: {
    openMenu: (state) => {
      state.menuIsOpen = true;
    },
    closeMenu: (state) => {
      state.menuIsOpen = false;
    },
    setSunriseSunset: (state, action) => {
      const {sunriseTime, sunsetTime} = action.payload
      state.sunriseTime = sunriseTime
      state.sunsetTime = sunsetTime
    },
    setLastFetchedDate: (state) => {
      state.sunriseSunsetDataLastFetched = new Date().getDay()
    }

  },
});

export const { openMenu, closeMenu, setSunriseSunset, setLastFetchedDate } = uiSlice.actions;

export default uiSlice.reducer;
