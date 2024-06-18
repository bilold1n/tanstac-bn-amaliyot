import { configureStore } from "@reduxjs/toolkit";
import userslice from "../apps/userslice";
export const store = configureStore({
  reducer: {
    user: userslice,
  },
});
