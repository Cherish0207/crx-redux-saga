export const ADD = "ADD";
export const ASYNC_ADD = "ASYNC_ADD";
export const STOP_ADD = "STOP_ADD";
/**
 * dispatch( ASYNC_ADD)派发给仓库
 * 仓库中的 sagaMiddleware 会拦截到这个命令,异步操作比如延时，然后再次派发一个ADD动作，修改状态
 */