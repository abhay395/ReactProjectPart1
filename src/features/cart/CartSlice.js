import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItemFromCart, featchItemsByUserId, updateCart } from "./CartApi";

const initialState = {
  status: "idle",
  item: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const featchItemsByUserIdAsync = createAsyncThunk(
  "cart/featchItemsByUserId",
  async (userId) => {
    const response = await featchItemsByUserId(userId);
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.item.push(action.payload);
      })
      .addCase(featchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.item = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.item.findIndex(item=>item.id===(action.payload).id)
        state.item[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.item.findIndex(item=>item.id===(action.payload).id)
        state.item.splice(index,1)
      })
  },
});

// // export const { increment } = counterSlice.actions;

export const selectCartItem = (state) => state.cart.item;

export default cartSlice.reducer;
