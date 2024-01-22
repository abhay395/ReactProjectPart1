import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './AuthApi';

const initialState = {
  loggedInUser:null,
  status: 'idle',
  errors:null
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);
export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async (userId) => {
    const response = await signOut(userId);
    return response.data;
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: (state) => {
      state.errors=null
    },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
  },
});

export const {resetError} = userSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.errors;

export default userSlice.reducer;