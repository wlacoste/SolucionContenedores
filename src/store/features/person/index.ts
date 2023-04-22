import type { IPerson } from "domain/Person";

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import {
  type IState,
  fullfiledSimpleCallbackCase,
  pendingSimpleCallbackCase,
  rejectCallbackCase,
} from "@architecture-it/core";

import { getUsers } from "./asyncActions";

interface IPersonState extends IState<IPerson[]> {}

const initialState: IPersonState = {
  data: [],
  error: null,
  isLoading: false,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getall
    builder.addCase(getUsers.pending, (state) => {
      pendingSimpleCallbackCase(state);
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      rejectCallbackCase(state, action);
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      fullfiledSimpleCallbackCase(state);

      state.data = action.payload;
    });
  },
});

export default personSlice.reducer;

// export const { } = personSlice.actions;

export const selectPerson = (state: RootState) => state.person;
