import * as effectTypes from "./effectTypes";
export default function runSaga(env, saga) {
  console.log("runSaga");
  let { channel, dispatch } = env;
  let it = saga();
  function next(value) {
    let { value: effect, done } = it.next(value);
    if (!done) {
      switch (effect.type) {
        case effectTypes.TAKE:
          channel.channelTake(effect.actionType, next);
          break;
        case effectTypes.PUT:
          dispatch(effect.action);
          next();
          break;
        default:
          break;
      }
    }
  }
  next();
}
