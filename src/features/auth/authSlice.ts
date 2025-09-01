"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
};

export type AuthState = {
  token: string | null;
  user: User | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    hydrate: (state, action: PayloadAction<AuthState | null>) => {
      if (action.payload) {
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    }
  }
});

export const { setAuth, logout, hydrate } = slice.actions;
export default slice.reducer;
