// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import StorageKeys from "constants/storage-keys";
// import userApi from "../../api/userApi";

// export const register = createAsyncThunk("user/register", async (payload) => {
//   const data = await userApi.register(payload);
//   const { jwt, user } = data;

//   localStorage.setItem(StorageKeys.TOKEN, jwt);
//   localStorage.setItem(StorageKeys.USER, JSON.stringify(user));

//   return user;
// });

// export const login = createAsyncThunk("user/login", async (payload) => {
//   const data = await userApi.login(payload);
//   const { jwt, user } = data;

//   localStorage.setItem(StorageKeys.TOKEN, jwt);
//   localStorage.setItem(StorageKeys.USER, JSON.stringify(user));

//   return user;
// });

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
//     settings: {},
//   },
//   reducers: {
//     logOut: (state) => {
//       localStorage.removeItem(StorageKeys.USER);
//       localStorage.removeItem(StorageKeys.TOKEN);

//       state.current = {};
//     },
//   },
//   extraReducers: {
//     [register.fulfilled]: (state, action) => {
//       state.current = action.payload;
//     },
//     [login.fulfilled]: (state, action) => {
//       state.current = action.payload;
//     },
//   },
// });

// const { actions, reducer } = userSlice;
// export const { logOut } = actions;
// export default reducer;
