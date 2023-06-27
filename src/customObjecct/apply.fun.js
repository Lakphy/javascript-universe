/** apply
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
 */
function customApply(fun, context = window, argArr) {
  const funKey = Symbol("apply_function");
  context[funKey] = fun;
  const res = context[funKey](...argArr);
  delete context[funKey];
  return res;
}
