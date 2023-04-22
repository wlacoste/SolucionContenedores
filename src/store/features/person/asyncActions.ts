import { createAsyncThunk } from "@reduxjs/toolkit";
import * as useCases from "app/person";
import { isAxiosError } from "@architecture-it/core";
import type { RootState } from "store/store";

import { displayAlert } from "../alert/asyncActions";

const MESSAGE_STATUS = new Map<number, string>();

MESSAGE_STATUS.set(404, "La información solicitada no existe.");
MESSAGE_STATUS.set(500, "Error de servidor. Inténtelo de nuevo más tarde.");

export const getUsers = createAsyncThunk(
  "user/getAll",
  async (_, { rejectWithValue, signal }) => {
    try {
      const users = await useCases.getAll(signal);

      return users;
    } catch (error: any) {
      let message = "Ocurrió un error al obtener los colaboradores";

      if (isAxiosError(error)) {
        const errorCode = error.response?.status as number;

        message = MESSAGE_STATUS.get(errorCode) ?? message;
      }

      displayAlert({
        type: "error",
        message,
      });

      return rejectWithValue(error);
    }
  },
  {
    //siempre y cuando no esté cargando el estado hace la llamada
    condition: (_, { getState }) => {
      const { person } = getState() as RootState;

      return !person.isLoading;
    },
  }
);
