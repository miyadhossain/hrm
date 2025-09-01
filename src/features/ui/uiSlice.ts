"use client";
import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  dark: boolean;
};

const slice = createSlice({
  name: "ui",
  initialState: { dark: false } as UIState,
  reducers: {
    toggleDark: (state) => { state.dark = !state.dark; },
    setDark: (state, { payload }: { payload: boolean }) => { state.dark = payload; }
  }
});

export const { toggleDark, setDark } = slice.actions;
export default slice.reducer;
