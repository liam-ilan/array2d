const Array2d = require('../src/index.js')

const arr = new Array2d(5, 10).fill(0).map((item, i) => {return {content: i}})

// const col2 = arr.getColumn(2)
// col2[2].content = '.content'

// const col3 = arr.getColumn(2)
// col3[3] = 'string' 

// const row0 = arr.getRow(0)
// row0[0].content = '.content'

// const row1 = arr.getRow(1)
// row1[1] = 'string' 

function setColumnDecor(index, decor) {
  const col = arr.getColumn(index).map(item => decor) // returns a native "cloned" array
  arr.setColumn(index, col) // map into array2d
}

setColumnDecor(2, {content: 'c', color: '#feef00'})
console.log(arr)

function setRowDecor(index, decor) {
  const row = arr.getRow(index).map(item => decor)
  arr.setRow(index, row)
}

setRowDecor(2, {content: 'r', color: '#feef00'})
console.log(arr)

setRowColor('#f00')

