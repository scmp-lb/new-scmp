import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import swsService from "./swsService";
const initialState = {
  sws: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Add  SwS event
export const addSWSEvent = createAsyncThunk(
  "sws/event/create",
  async (swsData, thunkAPI) => {
    try {
      return await swsService.addSWS(swsData);
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
//Delete sws event

export const deleteSWSEvent = createAsyncThunk(
  "sws/events/delete",
  async (id, thunkAPI) => {
    try {
      return await swsService.deleteEvent(id);
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

//Get All SWS Events
export const getAllSwSEvents = createAsyncThunk(
  "events/SWS",
  async (_, thunkAPI) => {
    try {
      return await swsService.getAllSwSEvents();
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
// Edit Event
export const editSWSEvent = createAsyncThunk(
  "sws/event/edit",
  async ({ id, eventData }, thunkAPI) => {
    try {
      return await swsService.editSWSEvent(id, eventData);
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
export const swsSlice = createSlice({
  name: "sws",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSwSEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSwSEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sws = action.payload.sws;
      })
      .addCase(getAllSwSEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addSWSEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSWSEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sws = action;
      })
      .addCase(addSWSEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action;
      })
      .addCase(deleteSWSEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSWSEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = state.events.filter(
          (event) => event.id !== action.payload.id
        );
      })
      .addCase(editSWSEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSWSEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = action.payload;
      })
      .addCase(editSWSEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.paylaod;
      })
      .addCase(deleteSWSEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.paylaod;
      });
  },
});

export const { reset } = swsSlice.actions;
export default swsSlice.reducer;
