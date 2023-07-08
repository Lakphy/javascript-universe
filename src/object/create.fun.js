/** Object.create()
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 */
const customCreate = function (proto, defineProperties) {
  // 错误判断
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError(
      `Object prototype may only be an Object or null: ${proto}`
    );
  }
  if (defineProperties === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  // 定义新对象
  const obj = {};
  // 很多源码会选择 Object.create(null) 创建没有原型的空对象，避免 for in 遍历时遍历原型的性能问题

  // 设置原型
  Object.setPrototypeOf(obj, proto); // 建议使用setPrototypeOf设置原型
  // obj.__proto__ = proto // 不建议这么做了
  // 通常，应该使用 Object.setPrototypeOf() 方法来设置对象的原型。
  // 因为 Object.prototype.__proto__ 访问器已被弃用。

  // 追加属性
  if (defineProperties !== undefined) {
    Object.defineProperties(obj, defineProperties);
  }

  return obj;
};
