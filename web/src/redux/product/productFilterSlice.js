import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: 'all',
  categories: [],
};

const productFiterSlice = createSlice({
  name: "codeHistory",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    }
  },
});

export const { setFilter, setCategories } = productFiterSlice.actions;
export default productFiterSlice.reducer;
