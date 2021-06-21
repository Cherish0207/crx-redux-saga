import * as effectTypes from "./effectTypes";
export function take(actionType) {
  // 返回值是一个普通对象,我们称为指令对象
  return { type: effectTypes.TAKE, actionType };
}

export function put(action) {
  return { type: effectTypes.PUT, action };
}

export function fork(fn) {
  return { type: effectTypes.FORK, saga: fn };
}

export function takeEvery(actionType, saga) {
  function* takeEveryHelper() {
    while (true) {
      yield take(actionType);
      yield fork(saga); // fork 异步非阻塞调用，无阻塞的执行fn，执行fn时，不会暂停Generator
    }
  }
  return fork(takeEveryHelper);
}
export function call(fn, ...args) {
  return { type: effectTypes.CALL, fn, args };
}
export function cps(fn, ...args) {
  return { type: effectTypes.CPS, fn, args };
}
export function all(effects) {
  return { type: effectTypes.ALL, effects };
}
