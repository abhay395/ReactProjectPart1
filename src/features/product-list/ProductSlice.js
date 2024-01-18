import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { featchAllProductByFilter, featchAllProducts, featchBrands, featchCategories, featchSingelProduct } from './ProductApi';

const initialState = {
  products:[],
  status: 'idle',
  brands:[],
  categorys:[],
  SingelProduct:[],
  totalItems:0
};

export const featchCategoriesAsync = createAsyncThunk(
  'product/featchCategories',
  async () => {
    const response = await featchCategories();
    return response.data;
  }
);
export const featchBrandAsync = createAsyncThunk(
  'product/featchBrands',
  async () => {
    const response = await featchBrands();
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
export const featchSingelProductAsync = createAsyncThunk(
  'product/featchSingelProduct',
  async ({id}) => {
    const response = await featchSingelProduct(id);
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
      .addCase(featchAllProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload.products;
        state.totalItems=action.payload.totalItems;
      })
      .addCase(featchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categorys=action.payload;
      })
      .addCase(featchBrandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchBrandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands=action.payload;
      })
      .addCase(featchSingelProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchSingelProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.SingelProduct=action.payload;
      })
  },
});

export const { increment } = ProductSlice.actions;

export const SelectAllProducts = (state) => state.product.products;
export const SelectCategories = (state) => state.product.categorys;
export const SelectBrands = (state) => state.product.brands;
export const SelectSingelProduct = (state) => state.product.SingelProduct;
export const SelectTotalItems = (state) => state.product.totalItems;

export default ProductSlice.reducer;
