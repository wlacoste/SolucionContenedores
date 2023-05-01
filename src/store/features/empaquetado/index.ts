import { IState, fullfiledSimpleCallbackCase } from "@architecture-it/core";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store/store";

import { resultado } from "../../../domain/IResultado";

import { getEmpaquetado } from "./asyncActions";

export interface IEmpaquetadoState extends IState<resultado[][]> {}

const initialState: IEmpaquetadoState = {
  data: [],
  error: null,
  isLoading: false,
};

export const empaquetadoSlice = createSlice({
  name: "empaquetado",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmpaquetado.fulfilled, (state, action) => {
      fullfiledSimpleCallbackCase(state);
      const data = [action.payload].concat(state.data);

      state.data = data;
    });
  },
});

export default empaquetadoSlice.reducer;

export const selectEmpaquetado = (state: RootState) => state.empaquetado;
