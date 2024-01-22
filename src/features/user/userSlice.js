import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featchLoggedInUserInfo, featchLoggedInUserOrder, updateUser } from "./userApi";

const initialState = {
  status: "idle",
  userinfo:null,
  userOrders: [],
};

export const featchLoggedInUserOrderAsync = createAsyncThunk(
  "user/featchLoggedInUserOrder",
  async (userId) => {
    const response = await featchLoggedInUserOrder(userId);
    return response.data;
  }
);
export const featchLoggedInUserInfoAsync = createAsyncThunk(
  "user/featchLoggedInUserInfo",
  async (userId) => {
    const response = await featchLoggedInUserInfo(userId);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
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
      .addCase(featchLoggedInUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userinfo = action.payload
        // this info  can be different or more from logged in user info
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userinfo = action.payload
        // this info  can be different or more from logged in user info
      })
  },
});

// // export const { increment } = counterSlice.actions;
export const selectUserinfo = (state)=>state.user.userinfo
export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
