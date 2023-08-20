import { mockFetch } from "./mockFetch.util.js";

/**
 * Promise Worker with max concurrency, timeout and retry times
 * promise 管理工具，可以设置最大并发数，超时时间和重试次数
 *
 * @param {number} max
 * @param {number} timeout
 * @param {number} retry
 * @returns {function}
 * @example
 * const addWork = promiseWorker(2, 3000, 3);
 */
function promiseWorker(max, timeout, retry) {
  const works = [];
  let active = 0;

  /**
   * next work
   * 下一个任务
   * @returns {void}
   * @private
   */
  function nextWork() {
    active--;
    if (works.length > 0 && active < max) {
      works.shift()();
    }
  }

  /**
   * retry work
   * 重试任务
   * @param {function} fn 任务函数，返回一个 Promise
   * @param {number} retryCount 重试次数
   * @param {function} resolve Promise resolve
   * @param {function} reject Promise reject
   * @param  {...any} args 任务函数的参数
   * @returns {Promise} 返回一个 Promise
   * @private
   */
  function retryWork(fn, retryCount, resolve, reject, ...args) {
    if (retryCount >= retry) {
      return Promise.reject(new Error("retry too many times"));
    }
    addWork(fn, retryCount + 1, ...args);
  }

  /**
   * work runner
   * 任务执行器
   * @param {function} fn 任务函数，返回一个 Promise
   * @param {number} retryCount 重试次数
   * @param {function} resolve Promise resolve
   * @param {function} reject Promise reject
   * @param  {...any} args 任务函数的参数
   * @returns {void}
   * @private
   */
  async function workRunner(fn, retryCount, resolve, reject, ...args) {
    active++;
    let timer = null;
    timer = setTimeout(() => {
      timer = null;
      retryWork(fn, retryCount, resolve, reject, ...args);
      nextWork();
    }, timeout);
    try {
      const res = await fn(...args);
      if (timer) {
        clearTimeout(timer);
        resolve(res);
        nextWork();
      }
    } catch (err) {
      if (timer) {
        clearTimeout(timer);
        retryWork(fn, retryCount, resolve, reject, ...args);
        nextWork();
      }
    }
  }

  /**
   * queue in
   * 任务入队
   * @param {function} fn 任务函数，返回一个 Promise
   * @param {number} retryCount 重试次数
   * @param {function} resolve Promise resolve
   * @param {function} reject Promise reject
   * @param  {...any} args 任务函数的参数
   * @returns {void}
   * @private
   */
  function queueIn(fn, retryCount, resolve, reject, ...args) {
    works.push(workRunner.bind(null, fn, retryCount, resolve, reject, ...args));
    if (active < max && works.length > 0) {
      works.shift()();
    }
  }

  /**
   * new work
   * 新增任务
   *
   * @param {function} fn 任务函数，返回一个 Promise
   * @param {number} retryCount 重试次数
   * @param  {...any} args 任务函数的参数
   * @returns {Promise} 返回一个 Promise
   */
  function addWork(fn, retryCount, ...args) {
    return new Promise((resolve, reject) => {
      queueIn(fn, retryCount, resolve, reject, ...args);
    });
  }
  return addWork;
}

/**
 * @example
 */
const addWork = promiseWorker(2, 3000, 3);
addWork(
  () =>
    mockFetch(1000, "1").then(
      (res) => console.log(res),
      (err) => console.log(err)
    ),
  0
);
