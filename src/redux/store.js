import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './slices/homeSlice';
import roomSlice from './slices/roomSlice';

export const store = configureStore({
  reducer: {
    home: homeSlice,
    room: roomSlice,
  },
});
