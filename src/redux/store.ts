import { configureStore } from "@reduxjs/toolkit";
import { rtkQApi } from "./rtkQApi.ts";
import authReducer from "./features/authSlice";
import projectReducer from "./features/projectSlice.tsx";
const store = configureStore({
  reducer: {
    [rtkQApi.reducerPath]: rtkQApi.reducer,
    auth: authReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQApi.middleware),
});

export default store;
