import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
const contactInitialState = {
  items: [],
  loading: false,
  error: false,
};

const slice = createSlice({
  name: "contacts",
  initialState: contactInitialState,
  extraReducers: (builder) =>
    builder
     
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = false;
      })
      
});

export default slice.reducer;
