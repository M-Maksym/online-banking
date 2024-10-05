import { configureStore } from '@reduxjs/toolkit';
import historyReducer from '../features/slices/historySlice'


export const store = configureStore({
  reducer: {
    history: historyReducer,
  },
});