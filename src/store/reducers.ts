import { combineReducers } from "@reduxjs/toolkit";
import person from "store/features/person";
import alertReducer from "store/features/alert";

import empaquetado from "./features/empaquetado";

export const reducers = combineReducers({ person, alertReducer, empaquetado });
