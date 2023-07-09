function arrayFilter(arr, callback) {
  if (typeof callback !== "function") {
    throw Error("参数必须是一个函数");
  }
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback.call(arr, arr[i], i, arr)) {
      res.push(arr[i]);
    }
  }
  return res;
}
