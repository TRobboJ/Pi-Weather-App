import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import settingsReducer from "./settingsSlice";
import {SettingsState} from '../utils/interfaces'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    settings: settingsReducer,
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch