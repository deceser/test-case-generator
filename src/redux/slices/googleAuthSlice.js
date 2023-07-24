import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import googleAuthService from "src/services/googleAuth.service";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
};

export const getUser = createAsyncThunk("auth/getUser", async (_, { rejectWithValue }) => {
  try {
    const response = await googleAuthService.getGoogleUser();

    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(null);
  }
});

export const getMe = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
  try {
    const response = await googleAuthService.getMeAuth({ withCredentials: true });
    localStorage.setItem("token", response.data.accessToken);

    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(null);
  }
});

const setLoading = (state) => {
  state.status = "loading";
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const authGoogleSlice = createSlice({
  name: "googleAuth",
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending]: setLoading,

    [getUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.accessToken = action.payload;
      state.refreshToken = action.payload;
    },

    [getUser.rejected]: setError,
  },
});

export default authGoogleSlice.reducer;
