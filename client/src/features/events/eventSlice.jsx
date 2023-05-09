import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";
const initialState = {
  events: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Events
export const getEvents = createAsyncThunk(
  "events/getAll",
  async (_, thunkAPI) => {
    try {
      return await eventService.getEvents();
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
//Delete Event
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (id, thunkAPI) => {
    try {
      return await eventService.deleteEvent(id);
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
//Add Event
export const addEvent = createAsyncThunk(
  "event/create",
  async (eventData, thunkAPI) => {
    try {
      return await eventService.addEvent(eventData);
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
export const editEvent = createAsyncThunk(
  "event/edit",
  async ({ id, eventData }, thunkAPI) => {
    try {
      return await eventService.editEvent(id, eventData);
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

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = action;
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = state.events.filter(
          (event) => event.id !== action.payload.id
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.paylaod;
      })
      .addCase(editEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = action.payload;
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action;
      });
  },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
