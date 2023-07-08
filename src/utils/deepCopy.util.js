function deepCopy(obj) {
  if (!obj || typeof obj !== "object") return;
  let newObj = Array.isArray(obj) ? [] : {}; // 判断对象原型为数组对象的情况
  // 不需要考虑对象原型为原始数据类型对象的情况，因为原始数据类型对象无法遍历、复制、修改
  // 遍历对象
  for (let key in obj) {
    // 排除原型链上的属性
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
