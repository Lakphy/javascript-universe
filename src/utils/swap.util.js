function swap(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
}
function swap_byArray(a, b) {
  [a, b] = [b, a];
}
