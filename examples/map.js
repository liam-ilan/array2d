const Array2d = require('../src/index.js')

let multTable = new Array2d(10, 10)
multTable.fill(0)

multTable = multTable.map((item, x, y) => {
  return (x + 1) * (y + 1)
})

console.log(multTable)

console.log(multTable.mapColumns((column, x) => new Array(multTable.height).fill(x)))
console.log(multTable.mapRows((row, y) => new Array(multTable.width).fill(y)))
