import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: 'all',
};

const productFiterSlice = createSlice({
  name: "codeHistory",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = productFiterSlice.actions;
export default productFiterSlice.reducer;
