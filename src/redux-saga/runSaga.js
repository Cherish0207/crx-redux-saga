import * as effectTypes from "./effectTypes";
export default function runSaga(env, saga) {
  console.log("runSaga");
  let { channel, dispatch } = env;
  let it = typeof saga === "function" ? saga() : saga;
  function next(value) {
    let { value: effect, done } = it.next(value);
    if (!done) {
      if (typeof effect[Symbol.iterator] === "function") {
        runSaga(env, effect);
        next();
      } else {
        switch (effect.type) {
          case effectTypes.TAKE:
            channel.channelTake(effect.actionType, next);
            break;
          case effectTypes.PUT:
            dispatch(effect.action);
            next();
            break;
          case effectTypes.FORK:
            runSaga(env, effect.saga); // 开局一个新的子进程去运行saga
            next(); //不会阻塞当前的saga继续执行
            break;
          default:
            break;
        }
      }
    }
  }
  next();
}
