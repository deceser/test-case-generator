import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import checklistService from "../../services/checklist.service";

const initialState = {
  checklist: [],
  status: "idle",
};

export const getChecklist = createAsyncThunk("checklist/getChecklist", async (_, { rejectWithValue }) => {
  try {
    const response = await checklistService.getChecklist();

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

export const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {},
  extraReducers: {
    [getChecklist.pending]: setLoading,

    [getChecklist.fulfilled]: (state, action) => {
      state.status = "success";
      state.checklist = action.payload;
    },

    [getChecklist.rejected]: setError,
  },
});

export const { addItem, toggleCompleted, toggleSelectAll, romoveItem, toggleEdit, updateItem, toggleShowItem } =
  checklistSlice.actions;

export default checklistSlice.reducer;
