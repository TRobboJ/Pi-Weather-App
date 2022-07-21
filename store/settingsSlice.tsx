import { createSlice } from "@reduxjs/toolkit";
import settings from '../settings.json'

const initialState = {
    coords: [settings.coords.latitude, settings.coords.longitude],
    rainmapTimer: settings.timers.rainmapInMinutes * 1000 * 60,
    sunriseSunsetTimer: settings.timers.sunrisesunsetInHours * 1000 * 60 * 60,
    openweatherTimer: settings.timers.openweatherInMinutes * 1000 * 60
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    printCoords: (state) => {
        console.log(state.coords)
    }
  },
});

export const {printCoords} = settingsSlice.actions;

export default settingsSlice.reducer;
