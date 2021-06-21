import { put, takeEvery, call, cps } from "../redux-saga/effects";
import * as types from "./action-types";

const delay = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const readFile = (fileName, callback) =>
  setTimeout(() => {
    callback(null, fileName + "结果");
  }, 1000);

/**
 * call调用返回 promises的方法
 * cps调用一个支持回调函数的方法
 */
function* worker_add() {
  let data = yield cps(readFile, "文件名");
  console.log(data);
  // yield call(delay, 1000); // 告诉saga中间件,请帮我调用 delay方法,参数是1000 方便单元测试
  yield put({ type: types.ADD });
}
function* watcher_add() {
  yield takeEvery(types.ASYNC_ADD, worker_add);
}

export default function* rootSaga() {
  // takeEvery 监听action，每监听到一个action，就执行一次操作
  // 一个 task 就像是一个在后台运行的进程，在基于redux-saga的应用程序中，可以同时运行多个task
  yield watcher_add();
}
