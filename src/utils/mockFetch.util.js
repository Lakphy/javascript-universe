function mockFetch(delay, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

function mockFetchError(delay, error) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(error), delay);
  });
}

function mockFetchWithRandomDelay(value) {
  return mockFetch(getRandomInt(1000), value);
}

function mockFetchErrorWithRandomDelay(error) {
  return mockFetchError(getRandomInt(1000), error);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function mockFetchWithRandomError(value, error) {
  if (getRandomInt(10) > 5) {
    return mockFetchWithRandomDelay(value);
  } else {
    return mockFetchErrorWithRandomDelay(error);
  }
}

export {
  mockFetch,
  mockFetchError,
  mockFetchWithRandomDelay,
  mockFetchErrorWithRandomDelay,
  getRandomInt,
  mockFetchWithRandomError,
};
