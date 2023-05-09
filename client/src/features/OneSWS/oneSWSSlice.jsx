import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import oneSwSService from "./oneSWSService";
const initialState = {
  oneSWS: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Sws Event By Id
export const getSwsEventById = createAsyncThunk(
  "sws/getEvent",
  async (id, thunkAPI) => {
    try {
      return await oneSwSService.getSwsEventById(id);
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

export const oneSwSSlice = createSlice({
  name: "oneSWS",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getSwsEventById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSwsEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oneSWS = action.payload;
      })
      .addCase(getSwsEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = oneSwSSlice.actions;
export default oneSwSSlice.reducer;
