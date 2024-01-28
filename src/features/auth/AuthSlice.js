import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginUser, createUser, signOut,checkAuth } from './AuthApi';

const initialState = {
  loggedInUserToken:null,
  status: 'idle',
  userChecked:false,
  errors:null
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const LoginUserAsync = createAsyncThunk(
  'auth/LoginUser',
  async (loginInfo,{rejectWithValue}) => {
  try {
    const response = await LoginUser(loginInfo);
    return response.data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error)
  }
  }
);
export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuth',
  async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error)
    // return rejectWithValue(error)
  }
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
        state.loggedInUserToken = action.payload;
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload.message;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true
        // // state.errors = action.payload.message;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
  },
});

export const {resetError} = userSlice.actions;

export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.errors;
export const selectUserChecked = (state)=>state.auth.userChecked

export default userSlice.reducer;