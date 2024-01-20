import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder } from './OrderApi';

const initialState = {
  orders:[],
  status: 'idle',
};

export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        // // state.totalItems=action.payload.totalItems;
      })
  },
});

// export const { increment } = ProductSlice.actions;

// export const Select = (state) => state.product.products;

export default OrderSlice.reducer;
