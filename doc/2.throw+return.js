function* gen() {
  yield 11;
  yield 22;
  yield 33;
}
let iterator = gen();
console.log(iterator.next());
// console.log(iterator.throw());
console.log(iterator.return());// 返回或结束saga
console.log(iterator.next());
