export default function stdChannel() {
  console.log("stdChannel");
  let currentTakers = [];
  function channelTake(actionType, taker) {
    taker.actionType = actionType;
    taker.cancel = () => {
      currentTakers = currentTakers.filter((item) => item !== taker);
    };
    currentTakers.push(taker);
  }

  function channelPut(action) {
    console.log("put", action);
    currentTakers.forEach((taker) => {
      if (taker.actionType === action.type) {
        taker.cancel();
        taker(action);
      }
    });
  }

  return { channelTake, channelPut };
}
