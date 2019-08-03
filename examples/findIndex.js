const Array2d = require('../index.js')
const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
  return y * x
})

const multiples = matrix.findIndex((item) => { return item > 50 })
const y = multiples[0]
const x = multiples[1]

const res = matrix.find((item) => { return item > 50 })

console.log(`${y} * ${x} = ${res}`)
