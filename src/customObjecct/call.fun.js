/** call
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 */
function customCall(fun, context = window) {
  const args = [...arguments].slice(2);
  const funKey = Symbol("call_function");
  context[funKey] = fun;
  const res = context[funKey](...args);
  delete context[funKey];
  return res;
}
