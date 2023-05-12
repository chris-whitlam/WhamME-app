import { configureStore } from '@reduxjs/toolkit';

import bluetoothReducer from './slices/bluetoothSlice';
import songReducer from './slices/songSlice';
import toastReducer from './slices/toastSlice';

export const store = configureStore({
  reducer: {
    bluetooth: bluetoothReducer,
    song: songReducer,
    toast: toastReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
