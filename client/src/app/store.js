import authReducer from "../features/auth/authSlice";
import departmentReducer from "../features/departments/departmentSlice";
import eventReducer from "../features/events/eventSlice";
import oneDepartmentReducer from "../features/oneDepartment/oneDepartmentSlice";
import oneEventReducer from "../features/oneEvent/oneEventSlice";
import swsReducer from "../features/SWS/swsSlice";
import oneSWSReducer from "../features/OneSWS/oneSWSSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sws: swsReducer,
    oneSWS: oneSWSReducer,
    departments: departmentReducer,
    events: eventReducer,
    event: oneEventReducer,
    department: oneDepartmentReducer,
  },
});

export default store;
