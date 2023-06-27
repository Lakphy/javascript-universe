// 随手测使用的主文件

import request from "request";
import customPromise from "./customPromise/promise.cls.js";

var promise1 = new customPromise((resolve) => {
  request("https://www.baidu.com", function (error, response) {
    if (!error && response.statusCode == 200) {
      resolve(
        new customPromise((resolve) => {
          resolve(1);
        })
      );
    }
  });
});

promise1
  .then(function (value) {
    console.log(value);
    return 1234;
  })
  .then((res) => {
    console.log(res);
    return 12345;
  })
  .then(1)
  .then()
  .then((res) => {
    console.log(res);
    return 123456;
  })
  .then((res) => {
    console.log(res);
    return 1234567;
  });

console.log(customPromise.all);
