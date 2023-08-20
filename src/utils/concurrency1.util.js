import { mockFetch } from "./mockFetch.util.js";

function limitFetch(limit) {
  const queue = [];
  let active = 0;

  function next() {
    active--;
    if (queue.length > 0 && active < limit) {
      queue.shift()();
    }
  }
  async function runner(fn, resolver, ...args) {
    active++;
    const res = await fn(...args);
    resolver(res);
    next();
  }
  function queueIn(fn, resolver, ...args) {
    queue.push(runner.bind(null, fn, resolver, ...args));
    if (active < limit && queue.length > 0) {
      queue.shift()();
    }
  }
  function _generator(fn, ...args) {
    return new Promise((resolve) => {
      queueIn(fn, resolve, ...args);
    });
  }

  return _generator;
}

const limitGenerator = limitFetch(2);

const works = [
  limitGenerator(() => mockFetch(1000, "1").then((res) => console.log(res))),
  limitGenerator(() => mockFetch(1000, "2").then((res) => console.log(res))),
  limitGenerator(() => mockFetch(1000, "3").then((res) => console.log(res))),
  limitGenerator(() => mockFetch(1000, "4").then((res) => console.log(res))),
  limitGenerator(() => mockFetch(1000, "5").then((res) => console.log(res))),
  limitGenerator(() => mockFetch(1000, "6").then((res) => console.log(res))),
  limitGenerator(() => mockFetch(1000, "7").then((res) => console.log(res))),
  limitGenerator(() => mockFetch(1000, "8").then((res) => console.log(res))),
  limitGenerator(() => mockFetch(1000, "9").then((res) => console.log(res))),
];

Promise.all(works).then((res) => console.log(res));
console.log("start");
