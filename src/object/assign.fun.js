/** Object.assign()
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
function customAssign(target, ...sources) {
  if (!target || !sources.length) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  sources.forEach((source) => {
    if (source) {
      for (let key in source) {
        // 过滤从原型链上继承的属性
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
      // 补充处理 Symbol 类型的属性
      Object.getOwnPropertySymbols(source).forEach((symbol) => {
        target[symbol] = source[symbol];
      });
      // 也可以使用 Reflect.ownKeys() 方法来获取对象自身的属性键，其返回一个数组，包含对象自身的（不含继承）所有键名，不管键名是否Symbol、是否字符串、是否可枚举
    }
  });
  return target;
}
