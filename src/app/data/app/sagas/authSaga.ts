import authService from "@/app/services/auth-service";
import { snackbarActions } from "../../snackbar/slice";
import { call, put, takeLatest } from "redux-saga/effects";
import { router } from "@/app/routes";
import { appActions } from "../slices/slice";

export function* requestOtp(action) {
  try {
    const response = yield call(authService.requestOtp, action.payload);
    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: response.message,
      })
    );
    yield put(appActions.setSuccess());
    router.navigate(`/verify-email?ref=${action.payload.purpose}`);
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
export function* verifyOtp(action) {
  try {
    const response = yield call(authService.verifyOtp, action.payload);
    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: response.message,
      })
    );
    yield put(appActions.verifyOTPSuccess(response.access_token));
    yield put(appActions.setSuccess());
    router.navigate(`/new-password`);
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

export function* signupRequest(action) {
  try {
    const response = yield call(authService.signup, action.payload);
    yield put(appActions.setToken(response));
    yield put(appActions.setSuccess());
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

export function* login(action) {
  try {
    const response = yield call(authService.login, action.payload);
    yield put(appActions.setToken(response));
    yield put(appActions.setSuccess());
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
export function* resetPassword(action) {
  try {
    const response = yield call(authService.resetPassword, action.payload);
    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: response.message ?? "Password Reset Success",
      })
    );
    yield put(appActions.setSuccess());

    router.navigate("/reset-success");
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

export function* authSaga() {
  yield takeLatest(appActions.requestOtp, requestOtp);
  yield takeLatest(appActions.signup, signupRequest);
  yield takeLatest(appActions.login, login);
  yield takeLatest(appActions.resetPassword, resetPassword);
  yield takeLatest(appActions.verifyOTP, verifyOtp);
}

export default authSaga;
