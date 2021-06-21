import * as types from "./action-types";
const actions = {
  add() {
    return { type: types.ADD };
  },
  asyncAdd() {
    return { type: types.ASYNC_ADD };
  },
  stop() {
    return { type: types.STOP_ADD };
  },
};
export default actions;
