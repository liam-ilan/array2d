const Array2d = require('../index.js')

const matrix = new Array2d(10, 10).fill(0).map((item, x, y) => x % 10)

matrix.forEachRow((row, y) => {
  console.log(row)
})

console.log('--------------------------------')

matrix.forEachColumn((column, x) => {
  console.log(column)
})

console.log('--------------------------------')

let sum = 0
matrix.forEach((item) => {
  sum += item
})

console.log('sum = ' + sum)
