import { createSlice } from "@reduxjs/toolkit";

const contactInitialState = {
  filters: {
    name: "",
    number: "",
  },
};

const slice = createSlice({
  name: "filters",
  initialState: contactInitialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters.name = action.payload;
    },
    changeNumberFilter: (state, action) => {
      state.filters.number = action.payload;
    },
  },
});
export const { changeFilter, changeNumberFilter } = slice.actions;

export default slice.reducer;
