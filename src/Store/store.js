import { todoReducer } from "../Store/todoReducer";
import {legacy_createStore as createStore } from "redux";
export const store = createStore(todoReducer)