import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import settingsReducer from "./settingsSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    settings: settingsReducer,
  },
});
