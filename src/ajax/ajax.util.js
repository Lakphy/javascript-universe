function ajax(url, body = null, callback) {
  const xhr = new XMLHttpRequest(); // 创建实例
  const requestType = body ? "POST" : "GET";

  xhr.open(requestType, url, true); // requestType url 异步

  // 监听请求状态
  xhr.onreadystatechange = function () {
    // this 指向 xhr 实例
    // this.readyState 0-4 表示客户端 xhr 实例的状态
    if (this.readyState !== 4) return; // 不等于4，请求未完成，直接返回
    // this.status 响应状态码
    if (this.status === 200) {
      callback(this.response); // 处理请求结果
    } else {
      console.error(this.statusText);
    }
  };

  // 监听请求失败
  xhr.onerror = function () {
    console.error(this.statusText);
  };

  // 设置请求头
  xhr.responseType = "json";
  xhr.setRequestHeader("Accept", "application/json");

  // 发送 Http 请求
  xhr.send(body); // GET 请求不需要请求体，body设为null
}

function ajaxPromise(url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // 创建实例
    const requestType = body ? "POST" : "GET";

    xhr.open(requestType, url, true); // requestType url 异步

    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };

    xhr.onerror = function () {
      reject(this.statusText);
    };

    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");

    xhr.send(body);
  });
}
