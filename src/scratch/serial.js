const str = JSON.stringify({
  thing: 'one',
  num: 2,
  deeper: { a: 1, b: { c: 3 } }
});
const enc = encodeURIComponent(str);
const urc = encodeURI(str);
console.log(enc);
console.log(urc);
const denc = decodeURIComponent(enc);
const dunc = decodeURI(urc);
console.log(denc);
console.log(dunc);
if (denc === enc) console.log('enc=denc');
