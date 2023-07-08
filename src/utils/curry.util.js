function curry(fn, ..._args) {
  const args = _args || [];
  return function (..._args) {
    args.push(..._args);
    if (args.length < fn.length) {
      return curry(fn, ...args);
    } else {
      fn.apply(this, args);
    }
  };
}

function curry_es6(fn, ...args) {
  return args.length >= fn.length
    ? fn(...args)
    : (..._args) => curry_es6(fn, ...args, ..._args);
}
