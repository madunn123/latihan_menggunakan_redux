function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const subcribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((listenerItem) => listenerItem !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subcribe,
    dispatch,
  };
}

export { createStore };
