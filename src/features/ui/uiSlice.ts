"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  dark: boolean;
  title: string;
  subtitle: string;
};

const initialState: UIState = {
  dark: false,
  title: "",
  subtitle: "",
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDark: (state) => {
      state.dark = !state.dark;
    },
    setDark: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSubtitle: (state, action: PayloadAction<string>) => {
      state.subtitle = action.payload;
    },
  },
});

export const { toggleDark, setDark, setTitle, setSubtitle } = slice.actions;
export default slice.reducer;
