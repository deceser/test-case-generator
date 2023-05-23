import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import requirementService from "../../services/requirement.service";

const initialState = {
  data: [],
  status: "idle",
};

export const generateChecklist = createAsyncThunk(
  "requirement/generateChecklist",
  async ({ data, userId }, { rejectWithValue }) => {
    try {
      const response = await requirementService.generateChecklist(data, userId);

      // window.location.hash = "checklist";

      return response.data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const setLoading = (state) => {
  state.status = "loading";
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const requirementSlice = createSlice({
  name: "requirement",
  initialState,
  reducers: {},
  extraReducers: {
    [generateChecklist.pending]: setLoading,

    [generateChecklist.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;

      const checklist = action.payload.find((i) => i.checkListId);
      if (checklist) {
        localStorage.setItem("checklistId", checklist.checkListId);
      }
    },

    [generateChecklist.rejected]: setError,
  },
});

export const { setChecklistId } = requirementSlice.actions;

export default requirementSlice.reducer;
