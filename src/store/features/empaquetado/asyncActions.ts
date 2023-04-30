import { FormValues } from "domain/FormValues";

import * as useCases from "app/empaquetado";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEmpaquetado = createAsyncThunk(
  "empaquetado/calcular",
  async (paquetes: FormValues) => {
    const resultado = await useCases.calcularEmpaquetado(paquetes);

    return resultado;
  }
);
