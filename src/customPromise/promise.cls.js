const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class customPromise {
  constructor(fn) {
    try {
      fn(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  _status = STATUS.PENDING;
  get status() {
    return this._status;
  }
  set status(val) {
    if (this._status === STATUS.PENDING) {
      switch (val) {
        case STATUS.FULFILLED:
        case STATUS.REJECTED:
          this._status = val;
          return;
      }
    }
  }

  _result = null;
  get result() {
    return this._result;
  }
  set result(val) {
    if (this._status === STATUS.PENDING) {
      this._result = val;
    }
  }

  _reason = null;
  get reason() {
    return this._reason;
  }
  set reason(val) {
    if (this._status === STATUS.PENDING) {
      this._reason = val;
    }
  }

  resolve = (result) => {
    // console.log(this);
    if (this.status === STATUS.PENDING) {
      if (result instanceof customPromise) {
        result.then(this.resolve, this.reject);
        return;
      }
      this.result = result;
      this.status = STATUS.FULFILLED;
      this.fulfilledCallbacks.forEach((callback) => {
        callback(this.result);
      });
    }
  };
  reject = (reason) => {
    if (this.status === STATUS.PENDING) {
      this.reason = reason;
      this.status = STATUS.REJECTED;
      this.rejectedCallbacks.forEach((callback) => {
        callback(this.reason);
      });
    }
  };

  fulfilledCallbacks = [];
  rejectedCallbacks = [];

  then = (_onFulfilled, _onRejected) => {
    // 输入判断
    let onFulfilled = _onFulfilled;
    if (typeof onFulfilled !== "function") {
      onFulfilled = (val) => val;
    }
    let onRejected = _onRejected;
    if (typeof onRejected !== "function") {
      onRejected = (val) => val;
    }
    return new customPromise((resolve, reject) => {
      function handleFulfilled(result) {
        try {
          const res = onFulfilled(result);
          resolve(res);
        } catch (err) {
          reject(err);
        }
      }
      function handleRejected(reason) {
        try {
          const res = onRejected(reason);
          resolve(res);
        } catch (err) {
          reject(err);
        }
      }
      switch (this.status) {
        case STATUS.FULFILLED:
          handleFulfilled(this.result);
          break;
        case STATUS.REJECTED:
          handleRejected(this.reason);
          break;
        default:
          this.fulfilledCallbacks.push(handleFulfilled);
          this.rejectedCallbacks.push(handleRejected);
          break;
      }
    });
  };
  catch = (_onRejected) => {
    // 输入判断
    let onRejected = _onRejected;
    if (typeof onRejected !== "function") {
      onRejected = (val) => val;
    }
    return new customPromise((resolve, reject) => {
      function handleRejected(reason) {
        try {
          const res = onRejected(reason);
          resolve(res);
        } catch (err) {
          reject(err);
        }
      }
      switch (this.status) {
        case STATUS.REJECTED:
          handleRejected(this.reason);
          break;
        default:
          this.rejectedCallbacks.push(handleRejected);
          break;
      }
    });
  };
  finally = (_callback) => {
    // 输入判断
    let callback = _callback;
    if (typeof callback !== "function") {
      callback = (val) => val;
    }
    return new customPromise((resolve, reject) => {
      function handleFinally(result) {
        try {
          const res = callback(result);
          resolve(res);
        } catch (err) {
          reject(err);
        }
      }
      switch (this.status) {
        case STATUS.FULFILLED:
        case STATUS.REJECTED:
          handleFinally(this.reason);
          break;
        default:
          this.fulfilledCallbacks.push(handleFinally);
          this.rejectedCallbacks.push(handleFinally);
          break;
      }
    });
  };

  static name = "customPromise";

  /** Promise.resolve
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
   * @param  {...any} tasks
   * @returns
   */
  static resolve(val) {
    return new customPromise((resolve) => resolve(val));
  }

  /** Promise.reject
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
   * @param  {...any} tasks
   * @returns
   */
  static reject(err) {
    return new customPromise((_, reject) => reject(err));
  }

  /** Promise.all
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
   * @param  {...any} tasks
   * @returns
   */
  static all(...tasks) {
    const taskNum = tasks.length;
    let fulfilledCount = 0;
    let results = new Array(taskNum).fill(null);
    return new customPromise((resolve, reject) => {
      for (let i = 0; i < taskNum; i++) {
        tasks[i].then(
          (res) => {
            results[i] = res;
            fulfilledCount++;
            if (fulfilledCount === taskNum) resolve(results);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }

  /** Promise.allSettled
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
   * @param  {...any} tasks
   * @returns
   */
  static allSettled(...tasks) {
    const taskNum = tasks.length;
    let doneCount = 0;
    let results = new Array(taskNum).fill(null);
    return new customPromise((resolve, reject) => {
      if (tasks.length === 0) {
        resolve([]);
        return;
      }
      for (let i = 0; i < taskNum; i++) {
        tasks[i].then(
          (res) => {
            results[i] = res;
            doneCount++;
            if (doneCount === taskNum) resolve(results);
          },
          (err) => {
            results[i] = err;
            doneCount++;
            if (doneCount === taskNum) resolve(results);
          }
        );
      }
    });
  }

  /** Promise.any
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
   * @param  {...any} tasks
   * @returns
   */
  static any(...tasks) {
    const taskNum = tasks.length;
    let rejectedCount = 0;
    let reasons = new Array(taskNum).fill(null);
    return new customPromise((resolve, reject) => {
      for (let i = 0; i < taskNum; i++) {
        tasks[i].then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reasons[i] = err;
            rejectedCount++;
            if (rejectedCount === taskNum) reject(reasons);
          }
        );
      }
    });
  }

  /** Promise.race
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
   * @param  {...any} tasks
   * @returns
   */
  static race(...tasks) {
    return new customPromise((resolve, reject) => {
      for (let i = 0; i < tasks.length; i++) {
        tasks[i].then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
}

export default customPromise;
