import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await userApi.register(payload);
  const { token, user } = data;

  localStorage.setItem(StorageKeys.TOKEN, token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(user));

  return user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  const data = await userApi.login(payload);
  const { token, user } = data;

  localStorage.setItem(StorageKeys.TOKEN, token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(user));

  return user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logOut } = actions;
export default reducer;
