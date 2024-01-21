import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featchLoggedInUserOrder } from "./userApi";

const initialState = {
  status: "idle",
  userOrders: [],
};

export const featchLoggedInUserOrderAsync = createAsyncThunk(
  "user/featchLoggedInUserOrder",
  async (userId) => {
    const response = await featchLoggedInUserOrder(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(featchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload
        // this info  can be different or more from logged in user info
      })
  },
});

// // export const { increment } = counterSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
