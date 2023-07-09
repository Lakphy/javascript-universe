function flatten_reduce(arr) {
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return [...prev, ...flatten(cur)];
    } else {
      return [...prev, cur];
    }
  }, []);
}

function flatten_es6(arr) {
  return arr.flat(Infinity);
}

function flatten_concat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

function flatten_string(arr) {
  return arr.toString().split(",");
}

function flatten_stack(arr) {
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}

function flatten_json(arr) {
  return JSON.stringify(arr).replace(/\[|\]/g, "").split(",");
}
