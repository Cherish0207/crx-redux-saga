export const TAKE = "TAKE"; // 监听特定的动作
export const PUT = "PUT"; //向仓库派发动作
export const FORK = "FORK"; // 开启一个新的子进程,一般不会阻塞当前的进程saga
export const CALL = "CALL"; // 调用一个函数,默认此函数需要返回一个 promise
export const CPS = "CPS"; // 调用一个函数,此函数的最后一个参数应该是一个callback,调用ca11back可以让saga继续向下执行
export const ALL = "ALL"; // 接收多个 iterator,等多个 iterator都结束后才会完全结束
export const CANCEL = "CANCEL";
