function* gen() {
  let a = yield 11;
  console.log("a:", a);
  let b = yield 22;
  console.log("b:", b);
  let c = yield 33;
  console.log("c:", c);
}
// let iterator = gen();
// // 选代器的第一次next参数无人接收，没有意义
// console.log(iterator.next("a")); // 第一个a值没有意义
// console.log(iterator.next("b"));
// console.log(iterator.next("c"));

/**
 * gen：生成器函数
 * 执行生成器，返回迭代器
 */

function co(gen) {
  return new Promise((resolve, reject) => {
    let it = gen();
    function next(val) {
      let { done, value } = it.next(val);
      console.log(done, value);
      if (done) {
        resolve(val);
      } else {
        Promise.resolve(value).then(next, reject);
      }
    }
    next();
  });
}
co(gen).then((data) => {
  console.log("co", data);
});
