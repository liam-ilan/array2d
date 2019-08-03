const Array2d = require('../src/index.js')

const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
  return (y + 1) * (x + 1)
})

console.log(matrix.reduce((acc, item, y, x) => {
  return acc + item
}))

const small = new Array2d(1, 10).fill(0).map((item, y, x) => {
  return (y + 1) * (x + 1)
})

// sum of all odd numbers
console.log(small.reduce((acc, item, y, x) => {
  return item % 2 ? acc + item : acc
}, 100))

// biggest number divisible by three
console.log(small.reduce((acc, item, y, x) => {
  return (!(item % 3) && item > acc) ? item : acc
}, -1))
