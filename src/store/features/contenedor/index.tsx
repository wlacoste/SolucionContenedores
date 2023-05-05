import { IContenedor } from "domain/IContenedor";

import { IState, fullfiledSimpleCallbackCase } from "@architecture-it/core";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";

import { getContenedores } from "./asyncActions";

export interface IContenedorState extends IState<IContenedor[]> {}

const initialState: IContenedorState = {
  data: [],
  error: null,
  isLoading: false,
};

export const contenedorSlice = createSlice({
  name: "contenedores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContenedores.fulfilled, (state, action) => {
      fullfiledSimpleCallbackCase(state);
      state.data = action.payload;
    });
  },
});

export default contenedorSlice.reducer;

export const selectContenedores = (state: RootState) => state.contenedores;
