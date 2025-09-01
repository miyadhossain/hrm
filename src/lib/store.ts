"use client";
import authReducer from "@/features/auth/authSlice";
import uiReducer from "@/features/ui/uiSlice";
import { api } from "@/services/api";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Load auth state from localStorage
function loadAuth() {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

const preloadedState = {
  auth: loadAuth(), // ✅ hydrate auth slice
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Persist auth in localStorage
export const persistAuth = () => {
  try {
    const state = store.getState().auth;
    localStorage.setItem("auth", JSON.stringify(state));
  } catch {}
};
