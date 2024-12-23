import { Action, Reducer, ReducersMapObject, Store } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { Saga } from "redux-saga";

export interface ReduxModule<
  State = { [key in string]: { [key1 in string]: any } }
> {
  /**
   * Id of the module
   */
  id: string;
  /**
   * Reducers for the module
   */
  reducerMap?: ReducersMapObject<State, AnyAction>;
  /**
   * Middlewares to add to the store
   */
  sagas?: Saga[];
  /**
   * These actions are dispatch immediately after adding the module in the store
   */
  initialActions?: AnyAction[];
}

type AAA = ReduxModule | ReduxModule[];

export interface ReduxModuleStore extends Store {
  asyncReducers: ReducersMapObject<
    { [key in string]: { [key1 in string]: any } },
    Action
  >;
  asyncSagas: Set<Saga>;
  loadedModules: { [id in string]: ReduxModule };
  loadModule: (module: AAA | AAA[]) => void;
  injectReducer: (key: string, asyncReducer: Reducer) => void;
  injectSaga: (saga: Saga) => void;
}
