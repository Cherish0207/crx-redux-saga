import * as effectTypes from "./effectTypes";
export function take(actionType) {
  // 返回值是一个普通对象,我们称为指令对象
  return { type: effectTypes.TAKE, actionType };
}

export function put(action) {
  return { type: effectTypes.PUT, action };
}
