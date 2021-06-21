import { put, take, all } from "../redux-saga/effects";
import * as types from "./action-types";
export function* add1() {
  for (let i = 0; i < 3; i++) {
    yield take(types.ASYNC_ADD);
    yield put({ type: types.ADD });
  }
  return "add1";
}
export function* add2() {
  for (let i = 0; i < 2; i++) {
    yield take(types.ASYNC_ADD);
    yield put({ type: types.ADD });
  }
  return "add2";
}
export default function* rootSaga() {
  let result = yield all([add1(), add2()]);
  console.log("done", result);
}
