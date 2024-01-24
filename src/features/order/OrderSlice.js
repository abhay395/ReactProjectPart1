import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder, featchAllOrder, updateOrder } from './OrderApi';

const initialState = {
  orders:[],
  status: 'idle',
  currentOrder:null,// this use for id ,
  totalOrders:0
};

export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);
export const featchAllOrderAsync = createAsyncThunk(
  'order/featchAllOrder',
  async ({pagination,sort}) => {
    const response = await featchAllOrder(pagination,sort);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
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
      .addCase(featchAllOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // // state.orders.push(action.payload);
        state.orders = action.payload.orders
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // // state.orders.push(action.payload);
        const index = state.orders.findIndex((item)=>item.id===action.payload.id)
        state.orders.splice(index,1,action.payload)
        // state.totalOrders = action.payload.totalOrders;
      })
  },
});

export const { resetCurrentOrder } = OrderSlice.actions;

export const SelectCurrentOrder = (state) => state.order.currentOrder
export const SelectAllOrder = (state) => state.order.orders
export const selectTotalOrders= (state)=> state.order.totalOrders

export default OrderSlice.reducer;
