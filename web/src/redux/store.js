import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productFiterReducer from "./product/productFilterSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    filter: productFiterReducer,
  },
});
