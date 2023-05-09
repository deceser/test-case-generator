import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import checklistService from "../../services/checklist.service";
import checkService from "../../services/check.service";

const initialState = {
  items: [],
  status: "idle",
  isAllSelected: true,
};

export const getItems = createAsyncThunk(
  "items/getItems",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await checklistService.getChecklistItems(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const addNewItem = createAsyncThunk(
  "items/addNewItem",
  async (item, { rejectWithValue }) => {
    try {
      const response = await checkService.createItem(
        item.name,
        item.isActive,
        item.checkListId,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await checkService.deleteItem(id);

      dispatch(removeItem({ id }));
      return response.data;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const updatedItem = createAsyncThunk(
  "items/updateItem",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await checkService.updateItem(item.id, {
        key: "/name",
        value: item.name,
      });
      dispatch(updateItem({ ...item }));
      return response.data;
    } catch (error) {
      rejectWithValue(null);
    }
  },
);

export const toggleStatus = createAsyncThunk(
  "items/toggleStatus",
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const item = getState().items.items.find((i) => i.id === id);
      const isActive = !item.isActive;
      const response = await checkService.updateItem(id, {
        key: "/isActive",
        value: isActive,
      });

      dispatch(toggleCompleted({ id }));
      return response.data;
    } catch (error) {
      rejectWithValue(null);
    }
  },
);

export const toggleStatusAll = createAsyncThunk(
  "items/toggleStatusAll",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState().items;
      const initialItems = state.items;
      // Create a new array that contains all items with their isActive values toggled
      const updatedItems = state.items
        .map((item) => ({
          id: item.id,
          isActive: !state.isAllSelected,
          parentId: item.checkListId,
        }))
        .filter((updatedItem, index) => {
          const initialItem = initialItems[index];
          return updatedItem.isActive !== initialItem.isActive;
        });
      // Send only changed items to the server
      const response = await checklistService.toggleStatusAll(updatedItems);
      // We form a new array of elements based on the initial state
      const updatedItemsFull = initialItems.map((initialItem, index) => {
        const updatedItem = updatedItems.find(
          (item) => item.id === initialItem.id,
        );
        if (updatedItem) {
          return updatedItem;
        }
        return initialItem;
      });
      // Check if among the updated elements there are inactive ones
      const hasFalse = updatedItemsFull.some((i) => i.isActive === false);
      // If there are inactive elements, then change the state to false
      // Otherwise to true
      const newIsAllCheckboxesSelected = !hasFalse;
      // Dispatch the toggleSelectAll action with a new state for isAllSelect
      dispatch(
        toggleSelectAll({
          isAllSelected: newIsAllCheckboxesSelected,
        }),
      );

      return response.data;
    } catch (error) {
      rejectWithValue(null);
    }
  },
);

const setLoading = (state) => {
  state.status = "loading";
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    updateItem: (state, action) => {
      const { id, name, isActive } = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return {
            id,
            name,
            isActive,
          };
        }
        return item;
      });
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    toggleCompleted(state, action) {
      const toggledItem = state.items.find((i) => i.id === action.payload.id);
      toggledItem.isActive = !toggledItem.isActive;
      state.isAllSelected = state.items.every((item) => item.isActive);
    },
    toggleSelectAll(state, action) {
      const { isAllSelected } = action.payload;
      const updatedItems = state.items.map((i) => ({
        ...i,
        isActive: isAllSelected,
      }));

      const hasFalse = updatedItems.some((i) => i.isActive === false);
      const newIsAllSelected = !hasFalse;

      return {
        ...state,
        items: updatedItems,
        isAllSelected: newIsAllSelected,
      };
    },
    toggleEdit(state, action) {
      const editItem = state.items.find((i) => i.id === action.payload.id);
      if (editItem) {
        editItem.isEdit = !editItem.isEdit;
      }
    },
    // change input item
    onChangeItemUpdate: (state, action) => {
      const { id, name } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.id = id;
        item.name = name;
      }
    },
  },

  extraReducers: {
    [getItems.pending]: setLoading,
    [addNewItem.pending]: setLoading,
    [updatedItem.pending]: setLoading,
    [deleteItem.pending]: setLoading,
    [toggleStatus.pending]: setLoading,
    [toggleStatusAll.pending]: setLoading,

    [getItems.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },

    [addNewItem.fulfilled]: (state, action) => {
      state.status = "success";
      state.items.push(action.payload);
    },

    [getItems.rejected]: setError,
    [addNewItem.rejected]: setError,
    [updatedItem.rejected]: setError,
    [deleteItem.rejected]: setError,
    [toggleStatus.rejected]: setError,
    [toggleStatusAll.rejected]: setError,
  },
});

export const {
  toggleCompleted,
  toggleSelectAll,
  removeItem,
  toggleEdit,
  updateItem,
  onChangeItemUpdate,
} = itemsSlice.actions;

export default itemsSlice.reducer;
