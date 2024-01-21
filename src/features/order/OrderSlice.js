import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder } from './OrderApi';

const initialState = {
  // orders:[],
  status: 'idle',
  currentOrder:null// this use for id 
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
    resetCurrentOrder: (state) => {
      state.currentOrder=null
    },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // // state.orders.push(action.payload);
        state.currentOrder = action.payload
      })
  },
});

export const { resetCurrentOrder } = OrderSlice.actions;

export const SelectCurrentOrder = (state) => state.order.currentOrder

export default OrderSlice.reducer;
