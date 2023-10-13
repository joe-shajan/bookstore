import { createSlice } from "@reduxjs/toolkit";

const LIMIT = 12;

interface PaginationState {
  page: number;
  skip: number;
  start: number;
  end: number;
  TotalBooks: number;
}

const initialState = {
  page: 0,
  skip: 0,
  start: 1,
  end: 12,
  TotalBooks: 0,
} as PaginationState;

export const pagination = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    next: (state) => {
      if (state.skip + 12 < state.TotalBooks) {
        state.page += 1;
        state.skip = LIMIT * state.page;
        state.start = state.page * LIMIT + 1;
        state.end = (state.page + 1) * LIMIT;
        if (state.end > state.TotalBooks) {
          state.end = state.TotalBooks;
        }
      }
    },
    previous: (state) => {
      if (state.page > 0) {
        state.page -= 1;
        state.skip = LIMIT * state.page;
        state.start = state.page * LIMIT + 1;
        state.end = (state.page + 1) * LIMIT;
        if (state.end > state.TotalBooks) {
          state.end = state.TotalBooks;
        }
      }
    },
    updateTotalBooks: (state, action) => {
      if (state.TotalBooks === state.end) {
        state.end = action.payload;
      }
      state.TotalBooks = action.payload;
      if (state.end > state.TotalBooks) {
        state.end = state.TotalBooks;
      }
    },
  },
});

export const { next, previous, updateTotalBooks } = pagination.actions;
export default pagination.reducer;
