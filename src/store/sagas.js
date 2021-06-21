import { put, take, cancel, fork, delay } from "../redux-saga/effects";
import * as actionTypes from "./action-types";
export function* add() {
  while (true) {
    yield delay(1000);
    yield put({ type: actionTypes.ADD });
  }
}
export function* addWatcher() {
  // 开启一个新的子进程去执行add,返回一个task任务对象
  const task = yield fork(add);
  console.log(task);
  // 等待有个向仓库派发5T0PADD这个动作,如果有人派发了,就继续向下执行
  yield take(actionTypes.STOP_ADD);
  // 取消任务执行
  yield cancel(task);
}

export default function* rootSaga() {
  yield addWatcher();
}
