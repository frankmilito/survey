import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { store } from "../../../store/configureStore";

type AlertColor = "error" | "success" | "info" | "warning";

export interface SnackBarState {
  open: boolean;
  message?: string;
  typeColor: AlertColor;
}

export const initialState: SnackBarState | undefined = {
  open: false,
  message: undefined,
  typeColor: "info",
};

const slice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackBar: (
      state,
      action: PayloadAction<{ text: string; color: AlertColor }>
    ) => {
      state.open = true;
      state.message = action.payload.text;
      state.typeColor = action.payload.color;
    },
    closeSnackBar: (state) => {
      state.open = false;
      state.typeColor = "info";
      state.message = "";
    },
  },
  selectors: {
    selectOpen: (state) => state.open,
    selectMessage: (state) => state.message,
    selectTypeColor: (state) => state.typeColor,
  },
});

export const {
  actions: snackbarActions,
  reducer: snackbarReducer,
  selectors,
} = slice;

export const useSnackBar = () => {
  store.injectReducer(slice.name, slice.reducer);
  return { actions: slice.actions };
};

export default slice;
