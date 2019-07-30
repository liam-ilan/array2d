const Array2d = require('../index.js')
const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
  return y * x
})


multiples = matrix.findIndex((item) => { return item > 50 })
y = multiples[0]
x = multiples[1]

res = matrix.find((item) => { return item > 50 })

console.log(`${y} * ${x} = ${res}`)
