import { call, put, takeLatest } from "redux-saga/effects";
import userService from "@/app/services/user-service";
import { router } from "@/app/routes";
import { appActions } from "../slices/slice";
import { snackbarActions } from "../../snackbar/slice";

export function* getUserProfile() {
  try {
    const response = yield call(userService.getProfile);
    yield put(appActions.updateProfileSuccess(response));
  } catch (error: any) {
    yield put(appActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

function* updateCompany(action) {
  try {
    const response = yield call(userService.updateCompany, action.payload);
    yield put(appActions.updateCompanySuccess(response));
    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: "Company creation successful",
      })
    );
    router.navigate("/dashboard");
  } catch (error: any) {
    yield put(appActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* profileSaga() {
  yield takeLatest(appActions.getProfile, getUserProfile);
  yield takeLatest(appActions.updateCompany, updateCompany);
}

export default profileSaga;
