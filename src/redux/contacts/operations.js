import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createGameInfo = createAsyncThunk(
  "createInfoAboutUser",
  async (gameInfo, thunkAPI) => {
    try {
      const response = await axios.post("/game", gameInfo);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateGameInfo = createAsyncThunk(
  "updateInfoAboutUser",
  async ({ username, time, victory, allGames }, thunkAPI) => {
    try {
      const response = await axios.put(`/game/${username}`, {
        username,
        time,
        victory,
        allGames,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getGameInfo = createAsyncThunk(
  "getInfoAboutUser",
  async (username, thunkAPI) => {
    try {
      const response = await axios.get(`/game/${username}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
