export default function smartMerge(a, b) {
  const obj = a;

  for (let option in b) {
    if (obj[option]) {
      if (typeof obj[option] === 'object') {
        obj[option] = smartMerge(a[option], b[option])
      } else {
        obj[option] = b[option]
      }
    } else {
      obj[option] = b[option];
    }
  }
  return obj;
}
