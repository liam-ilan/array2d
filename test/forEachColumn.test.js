/* global it describe */

// note: both forEachColumn and forEachRow ignore if the row is "empty", and always loop over it
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#forEachColumn()', function () {
    it('should loop width times', function () {
      const matrix = new Array2d(5, 10).fill(0)
      let counter = 0

      matrix.forEachColumn(() => { counter += 1 })

      assert(counter === 10)
    })

    it('should loop pass column, x, and the array to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][4] = 'some value'
      let res = false

      matrix.forEachColumn((column, x, array) => {
        if (x === 4 && column[0] === 'some value' && array.width === 10) { res = true }
      })

      assert(res)
    })

    it('should not loop when width is 0', function () {
      const matrix = new Array2d(5, 0).fill(0)

      let counter = 0
      matrix.forEachColumn(() => { counter += 1 })

      assert(counter === 0)
    })

    it('should loop on empty columns', function () {
      const matrix = new Array2d(5, 10)

      let counter = 0
      matrix.forEachColumn(() => { counter += 1 })

      assert(counter === 10)
    })
  })
})
