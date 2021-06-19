import { put, take } from "../redux-saga/effects";
import * as types from "./action-types";

// rootage如何执行的,如何启动,如何运行的,在运行中是如何处理和响应接收到的指令的?
export default function* rootSaga() {
  console.log("run rootSaga");
  for (let i = 0; i < 3; i++) {
    // 等待有人向仓库派发一个 ASYNC ADD命令,等到了就继续执行,等不到就卡在这里
    // take只等一次
    // take、put都是普通函数,执行后会返一个普通的指令对象 这个对像相当于一个普通对象的指令,指挥saga中间件做一些事情
    yield take(types.ASYNC_ADD);
    // 向仓库派发一个动作,让仓库调用 store.dispatch((type: types.ADD})
    yield put({ type: types.ADD });
  }
  console.log("已经达到最大值");
}
