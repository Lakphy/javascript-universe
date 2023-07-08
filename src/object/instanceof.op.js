/** instanceof
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof
 */
function customInstanceof(child, father) {
  if (child === null) return false;
  const proto = Object.getPrototypeOf(child);
  const prototype = father.prototype;
  if (proto === prototype) return true;
  else return customInstanceof(proto, father);
}
