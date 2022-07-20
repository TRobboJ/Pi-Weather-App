import { createSlice } from "@reduxjs/toolkit";
import settings from '../settings.json'


let awaitCoords
let initCoords
if (!settings.coords.gatherCoordsAutomatically) {
  initCoords = [settings.coords.latitude, settings.coords.longitude]
  awaitCoords = false
}
else {
  awaitCoords = true
  initCoords = []
}



const initialState = {
  coords: initCoords,
  awaitCoords: awaitCoords,
}




export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    setCoords: (state, action) => {
      const {latitude, longitude} = action.payload
      state.coords = [latitude, longitude]
    },
  },
});

export const {setCoords} = settingsSlice.actions;

export default settingsSlice.reducer;
