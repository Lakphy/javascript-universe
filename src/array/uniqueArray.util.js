function uniqueArray_set(arr) {
  return Array.from(new Set(arr));
}

function uniqueArray_object(arr) {
  let map = {};
  let res = [];
  for (var i = 0; i < arr.length; i++) {
    if (!map.hasOwnProperty([arr[i]])) {
      map[arr[i]] = 1;
      res.push(arr[i]);
    }
  }
  return res;
}

function unique_map(arr) {
  let map = new Map();
  for (var i = 0; i < arr.length; i++) {
    map.set(arr[i], 1);
  }
  return [...map.keys()];
}
