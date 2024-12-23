/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { Reducer, combineReducers } from "@reduxjs/toolkit";

import { snackbarReducer } from "../app/data/snackbar/slice";
import { reducer } from "@/app/data/app/slices/slice";
import { surveyReducer } from "@/app/data/app/slices/surveySlice";
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(
  injectedReducers: { [key: string]: Reducer } = {}
) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  return combineReducers({
    app: reducer,
    snackbar: snackbarReducer,
    survey: surveyReducer,
    ...injectedReducers,
  });
}
