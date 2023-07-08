function deepCopy_JSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function deepCopy_assign(obj) {
  return Object.assign({}, obj);
}

function deepCopy_spread(obj) {
  return { ...obj };
}
