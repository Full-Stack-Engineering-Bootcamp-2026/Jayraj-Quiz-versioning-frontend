import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthState } from "@/types/auth";

const initialState: AuthState = {
  token: null,
  permissions: [],
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        permissions: string[];
      }>
    ) => {
      state.token = action.payload.token;
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.token = null;
      state.permissions = [];
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } =
  authSlice.actions;

export default authSlice.reducer;