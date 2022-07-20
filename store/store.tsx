import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import uiReducer from "./uiSlice";


export default configureStore({
  reducer: {
    settings: settingsReducer,
    ui: uiReducer,
  },
});
