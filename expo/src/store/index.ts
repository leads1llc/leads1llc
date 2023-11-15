import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { settingsSliceReducer } from "./reducers/settings";
const appStore = configureStore({
  reducer: combineReducers({
    settingsSliceReducer
  })
});

export default appStore;
