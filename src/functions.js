export function splitFunc(array, n) {
  const [...arr] = array;
  const res = [];

  while (arr.length) {
    res.push(arr.splice(0, n));
  }

  return res;
}

export function capFirst(str) {
  return (str[0].toUpperCase() + str.slice(1));
}
