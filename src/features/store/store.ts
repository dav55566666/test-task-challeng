import { configureStore } from '@reduxjs/toolkit';
import { applicationsApi } from './api/applications-api';
import { participantsApi } from './api/participants-api';

export const store = configureStore({
  reducer: {
    [applicationsApi.reducerPath]: applicationsApi.reducer,
    [participantsApi.reducerPath]: participantsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(applicationsApi.middleware)
      .concat(participantsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
