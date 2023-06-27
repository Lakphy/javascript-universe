/** bind
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */
function customBind(fun, context = window) {
  const args = [...arguments].slice(2);

  return function () {
    const funKey = Symbol("bind_function");
    context[funKey] = fun;
    const result = context[funKey](...args, ...arguments);
    delete context[funKey];
    return result;
  };
}
