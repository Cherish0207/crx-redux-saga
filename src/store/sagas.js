import { put, takeEvery } from "../redux-saga/effects";
import * as types from "./action-types";

export function* add() {
  yield put({ type: types.ADD });
}

export default function* rootSaga() {
  // takeEvery 监听action，每监听到一个action，就执行一次操作
  // 一个 task 就像是一个在后台运行的进程，在基于redux-saga的应用程序中，可以同时运行多个task
  yield takeEvery(types.ASYNC_ADD, add);
}
