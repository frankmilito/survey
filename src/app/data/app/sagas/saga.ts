import { all } from "redux-saga/effects";
import profileSaga from "./userSaga";
import authSaga from "./authSaga";
import surveySaga from "./surveySaga";

export function* appSaga() {
  yield all([authSaga(), profileSaga(), surveySaga()]);
}

export default appSaga;
