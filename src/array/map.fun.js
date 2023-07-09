function arrayMap(arr, callback) {
  if (typeof fn !== "function") {
    throw Error("参数必须是一个函数");
  }
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(callback.call(arr, arr[i], i, arr));
  }
  return res;
}
