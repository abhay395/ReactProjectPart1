import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { featchAllProductByFilter, featchAllProducts } from './ProductApi';

const initialState = {
  products:[],
  status: 'idle',
  totalItems:0
};

export const featchAllProductAsync = createAsyncThunk(
  'product/featchAllProducts',
  async () => {
    const response = await featchAllProducts();
    return response.data;
  }
);
export const featchAllProductByFilterAsync = createAsyncThunk(
  'product/featchAllProductByFilter',
  async ({filter,sort,pagination}) => {
    const response = await featchAllProductByFilter(filter,sort,pagination);
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(featchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload;
      })
      .addCase(featchAllProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload.products;
        state.totalItems=action.payload.totalItems;
      })
  },
});

export const { increment } = ProductSlice.actions;

export const SelectAllProducts = (state) => state.product.products;
export const SelectTotalItems = (state) => state.product.totalItems;

export default ProductSlice.reducer;
