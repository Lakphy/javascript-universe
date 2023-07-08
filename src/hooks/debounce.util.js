function useDebounce(callback, t) {
  let timeRef = null;
  return function (...args) {
    const context = this; // this 将会指向调用时的上下文
    if (timeRef) clearTimeout(timeRef);
    timeRef = setTimeout(() => {
      callback.apply(context, args);
      timeRef = null;
    }, t);
  };
}
