/** @format */

import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.current = action.payload.userData;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  // extraReducers:(builder) => {

  // }
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
