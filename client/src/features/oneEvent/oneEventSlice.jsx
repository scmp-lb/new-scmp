import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import oneEventService from "./oneEventService";
const initialState = {
  event: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Events
export const getEventById = createAsyncThunk(
  "events/getEvent",
  async (id, thunkAPI) => {
    try {
      console.log(oneEventService.getEventById(id));
      return await oneEventService.getEventById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const oneEventSlice = createSlice({
  name: "oneEvent",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.event = action.payload.event;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = oneEventSlice.actions;
export default oneEventSlice.reducer;
