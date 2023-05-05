import { combineReducers } from "@reduxjs/toolkit";
import person from "store/features/person";
import alertReducer from "store/features/alert";

import empaquetado from "./features/empaquetado";
import contenedores from "./features/contenedor";

export const reducers = combineReducers({ person, alertReducer, empaquetado, contenedores });
