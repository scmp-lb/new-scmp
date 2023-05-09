import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentService from "./departmentService";
const initialState = {
  departments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Departments
export const getDepartments = createAsyncThunk(
  "departments/getAll",
  async (_, thunkAPI) => {
    try {
      console.log(departmentService.getDepartments());
      return await departmentService.getDepartments();
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

//Delete a department
export const deleteDepartment = createAsyncThunk(
  "departments/delete",
  async (id, thunkAPI) => {
    try {
      return await departmentService.deleteDepartment(id);
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

//Edit a Department
export const editDepartment = createAsyncThunk(
  "department/edit",
  async ({ id, departmentData }, thunkAPI) => {
    try {
      console.log("blaa", departmentService.editDepartment(id, departmentData));
      return await departmentService.editDepartment(id, departmentData);
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

//Add department
export const addDepartment = createAsyncThunk(
  "department/create",
  async (departmentData, thunkAPI) => {
    try {
      return await departmentService.addDepartment(departmentData);
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
export const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepartments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departments = payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departments = state.departments.filter(
          (department) => department.id !== action.payload.id
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.paylaod;
      })
      .addCase(editDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departments = action.payload;
      })
      .addCase(editDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departments = action.payload;
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = departmentSlice.actions;
export default departmentSlice.reducer;
