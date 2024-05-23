import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    isLoggedIn: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.username = null;
        state.isLoggedIn = false;
      }),
});

export default authSlice.reducer;
