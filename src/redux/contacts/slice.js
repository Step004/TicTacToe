import { createSlice } from "@reduxjs/toolkit";
import { updateGameInfo, getGameInfo } from "./operations";

const contactInitialState = {
  items: {
    time: null,
    victory: null,
    allGames: null,
  },
  loading: false,
  error: false,
};

const slice = createSlice({
  name: "contacts",
  initialState: contactInitialState,
  extraReducers: (builder) =>
    builder
      .addCase(updateGameInfo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateGameInfo.fulfilled, (state, action) => {
        state.items.time = action.payload.time;
        state.items.victory = action.payload.victory;
        state.items.allGames = action.payload.allGames;
        state.loading = false;
        state.error = false;
      })
      .addCase(updateGameInfo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getGameInfo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getGameInfo.fulfilled, (state, action) => {
        state.items.time = action.payload.time;
        state.items.victory = action.payload.victory;
        state.items.allGames = action.payload.allGames;

        state.loading = false;
        state.error = false;
      })
      .addCase(getGameInfo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export default slice.reducer;
