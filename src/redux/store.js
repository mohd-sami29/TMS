import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./slices/departmentSlice";
import designationReducer from "./slices/designationSlice";

export const store = configureStore({
  reducer: {
    department: departmentReducer,
    designation: designationReducer,
  },
});
