import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./features/pagination-slice";

export const store = configureStore({
  reducer: {
    paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
