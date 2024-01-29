import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  featchAllProductByFilter,
  featchAllProducts,
  featchBrands,
  featchCategories,
  featchSingelProduct,
  updateProduct,
} from "./ProductApi";

const initialState = {
  products: [],
  status: "idle",
  brands: [],
  categorys: [],
  SingelProduct: null,
  totalItems: 0,
};

export const featchCategoriesAsync = createAsyncThunk(
  "product/featchCategories",
  async () => {
    const response = await featchCategories();
    return response.data;
  }
);
export const featchBrandAsync = createAsyncThunk(
  "product/featchBrands",
  async () => {
    const response = await featchBrands();
    return response.data;
  }
);
export const featchAllProductByFilterAsync = createAsyncThunk(
  "product/featchAllProductByFilter",
  async ({ filter, sort, pagination ,role}) => {
    const response = await featchAllProductByFilter(filter, sort, pagination,role);
    return response.data;
  }
);
export const featchSingelProductAsync = createAsyncThunk(
  "product/featchSingelProduct",
  async ({ id }) => {
    const response = await featchSingelProduct(id);
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (addData) => {
    const response = await createProduct(addData);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (updateproductData) => {
    const response = await updateProduct(updateproductData);
    return response.data;
  }
);
export const deletProductAsync = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    const response = await deleteProduct(productId);
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.SingelProduct = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(featchAllProductByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(featchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categorys = action.payload;
      })
      .addCase(featchBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(featchSingelProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchSingelProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.SingelProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(deletProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products.splice(index,1)
      });
  },
});

export const { clearSelectedProduct } = ProductSlice.actions;

export const SelectAllProducts = (state) => state.product.products;
export const SelectCategories = (state) => state.product.categorys;
export const SelectBrands = (state) => state.product.brands;
export const SelectSingelProduct = (state) => state.product.SingelProduct;
export const SelectTotalItems = (state) => state.product.totalItems;
export const SelectStatusForProduct = (state) => state.product.status;

export default ProductSlice.reducer;
