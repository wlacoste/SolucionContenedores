import { createAsyncThunk } from "@reduxjs/toolkit";
import * as useCases from "app/contenedor";

export const getContenedores = createAsyncThunk("contenedores/get", async () => {
  const resultado = await useCases.getContenedoresData();

  return resultado;
});
