const Array2d = require('../src/index.js')

const myArr = new Array2d().fromNative([
  [1, 2, 3],
  [4, 5, 6]
]).indexOf(5)

console.log(myArr)

const yayArr = [
  [1, 2, 3],
  [4, 5, 6]
].toArray2d()

console.log(yayArr)
