import * as effectTypes from "./effectTypes";
export default function runSaga(env, saga) {
  console.log("runSaga");
  let { channel, dispatch } = env;
  let it = typeof saga === "function" ? saga() : saga;
  function next(value, isError) {
    let result;
    if (isError) {
      result = it.throw(value);
    } else {
      result = it.next(value);
    }
    let { value: effect, done } = result;
    if (!done) {
      if (typeof effect[Symbol.iterator] === "function") {
        runSaga(env, effect);
        next();
      } else if (typeof effect.then === "function") {
        effect.then(next);
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
          case effectTypes.CALL:
            effect.fn(...effect.args).then(next);
            break; // 会阻塞当前的saga继续执行
          case effectTypes.CPS:
            effect.fn(...effect.args, (err, data) => {
              if (err) {
                // 如果 error不为nu11,说明有错误了,next第一个参数就是错误对象
                next(err, true);
              } else {
                next(data);
              }
            });
            break;
          default:
            break;
        }
      }
    }
  }
  next();
}
