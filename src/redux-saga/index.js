import stdChannel from "./channel";
import runSaga from "./runSaga";
export default function createSagaMiddleware() {
  const channel = stdChannel();
  let boundRunSaga;
  console.log("createSagaMiddleware");
  let sagaMiddleware = ({ getState, dispatch }) => {
    boundRunSaga = runSaga.bind(null, { channel, dispatch, getState });
    return (next) => (action) => {
      next(action);
      channel.channelPut(action);
    };
  };
  sagaMiddleware.run = (saga) => boundRunSaga(saga);
  return sagaMiddleware;
}
