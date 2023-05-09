import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "store/features/alert";

import empaquetado from "./features/empaquetado";
import contenedores from "./features/contenedor";

export const reducers = combineReducers({ alertReducer, empaquetado, contenedores });
