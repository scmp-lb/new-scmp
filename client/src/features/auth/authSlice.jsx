import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
//Get user from locale storage

const user = localStorage.getItem("user");
const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isloading: false,
  message: "",
};

//Login user
export const login = createAsyncThunk("/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isloading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isloading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
