const Array2d = require('../index.js')

let multTable = new Array2d(10, 10)
multTable.fill(0)

multTable = multTable.map((item, x, y) => {
  return (x + 1) * (y + 1)
})

console.log(multTable)
