/** new
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new
 */
function customNew() {
  const args = [...arguments];
  const constructor = args.shift();

  // 判断输入
  if (typeof constructor !== "function") {
    console.log("Type Error");
    return;
  }

  const newObj = Object.create(constructor.prototype);
  const result = constructor.call(newObj, ...args);
  return typeof result === "object" ? result : newObj;
}
