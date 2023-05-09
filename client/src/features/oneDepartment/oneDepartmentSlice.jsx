import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import oneDepartmentService from "./oneDepartmentService";
const initialState = {
  department: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get  Departemnt by id
export const getDepartmentById = createAsyncThunk(
  "department/getDepartment",
  async (id, thunkAPI) => {
    try {
      return await oneDepartmentService.getDepartmentById(id);
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
export const oneDepartmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.department = action.payload.department;
      })
      .addCase(getDepartmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = oneDepartmentSlice.actions;
export default oneDepartmentSlice.reducer;
