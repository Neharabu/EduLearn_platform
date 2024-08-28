import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  auth_state_reducer,
  overlay_state_reducer,
  navbar_state_reducer,
  loading_state_reducer,
  user_state_reducer,
  delete_batch_state_reducer,
  day_state_reducer

} from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  overlay_state_reducer:overlay_state_reducer,
  auth_state_reducer:auth_state_reducer,
  navbar_state_reducer:navbar_state_reducer,
  loading_state_reducer:loading_state_reducer,
  user_state_reducer:user_state_reducer,
  delete_batch_state_reducer:delete_batch_state_reducer,
  day_state_reducer:day_state_reducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);