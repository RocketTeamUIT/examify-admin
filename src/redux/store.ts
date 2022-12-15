import { configureStore } from '@reduxjs/toolkit';
import appStateSlice from './features/appStateSlice';
import authSlice from './features/auth/authSlice';
import courseSlice from './features/course/courseSlice';

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    auth: authSlice,
    course: courseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
