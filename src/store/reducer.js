import * as types from "./action-types";
export default function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    // 在reducer里只处理ADD,不处理 ASYNC_ADD
    case types.ADD:
      return { number: state.number + 1 };
    default:
      return state;
  }
}
