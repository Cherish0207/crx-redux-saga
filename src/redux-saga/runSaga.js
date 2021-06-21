import * as effectTypes from "./effectTypes";
import { TASK_CANCEL } from "./symbols";
/**
 *
 * @param {*} env
 * @param {*} saga
 * @param {*} callback 完成后的回调
 */
export default function runSaga(env, saga, callback) {
  let task = { cancel: () => next(TASK_CANCEL) };
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
      } else if (value === TASK_CANCEL) {
        // 如果给next传入了TASK CANCEL,直接把任务取消掉
        result = it.return(value);
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
            let forkTask = runSaga(env, effect.saga); // 开启一个新的子进程去运行saga
            next(forkTask); //不会阻塞当前的saga继续执行
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
          case effectTypes.ALL:
            let effects = effect.effects;
            let result = [];
            let complete = 0;
            effects.forEach((effect, index) =>
              runSaga(env, effect, (res) => {
                result[index] = res;
                // 判断完成的数量和总的数量是否相等,如果相等,相当于任务全部结東,就可以让当前的saga继续next执行了
                if (++complete === effects.length) next(result);
              })
            );
            break;
          case effectTypes.CANCEL:
            effect.task.cancel();
            next();
            break;
          default:
            break;
        }
      }
    } else {
      // 如果done已经为true了,说明整个saga就结束了
      callback && callback(effect);
    }
  }
  next();
  return task;
}
