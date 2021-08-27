const reg = /[0-9]+/g;

const myStr = '9,999';

const [x, y] = myStr.match(reg);

console.log(typeof x, y);
