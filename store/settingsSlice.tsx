import { createSlice } from "@reduxjs/toolkit";
import settings from '../settings.json'




const initialState = {
  useImperial: settings.general.useImperial,
  useAMPM: settings.general.useAMPM,
  getLocation: settings.general.getLocation,
  coords: [settings.coords.latitude, settings.coords.longitude],
  rainmapTimer: settings.timers.rainmapInMinutes * 1000 * 60,
  openweatherTimer: settings.timers.openweatherInMinutes * 1000 * 60
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    setCoords: (state, action) => {
      const lat = action.payload[0]
      const lon = action.payload[1]
      state.coords = [lat, lon]
    }
  },
});

export const { setCoords } = settingsSlice.actions;

export default settingsSlice.reducer;
