import { configureStore } from "@reduxjs/toolkit";
import festivalReducer from "./slices/festivalSlice";

export default configureStore({
  reducer: {
    festival: festivalReducer,
  },
});
