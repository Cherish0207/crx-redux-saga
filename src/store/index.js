import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import createSagaMiddleware from "../redux-saga/index";
import rootSaga from "./sagas";
let sagaMiddleware = createSagaMiddleware();
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
// 启动一个saga执行
sagaMiddleware.run(rootSaga);
window.store = store;
export default store;
