const Array2d = require('../index.js')

const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
  return y * x
})
console.log(matrix.find((item) => { return item > 50 }))
