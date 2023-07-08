function useThrottle(callback, t) {
  let timeRef = null;
  return function (...args) {
    if (timeRef) return;
    callback.apply(this, args);
    timeRef = setTimeout(() => {
      timeRef = null;
    }, t);
  };
}
