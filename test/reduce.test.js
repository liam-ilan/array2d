/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#reduce()', function () {
    it('should reduce an array to a single value', function () {
      const matrix = new Array2d(10, 10).fill(1)

      assert(matrix.reduce((acc, item) => acc + item) === 100)
    })
    it('should use the given initial value as the first value, and start at y: 0, x: 0, when an initial value is given', function () {
      const matrix = new Array2d(10, 10).fill(1)
      let res = false

      matrix.reduce((acc, item, y, x) => {
        if (y === 0 && x === 0 && acc === 0) { res = true }
        return acc + item
      }, 0)

      assert(res)
    })
    it('should start at y: 0, x: 1 when no initial value is given', function () {
      const matrix = new Array2d(10, 10).fill(1)
      let res = false
      let counter = 0

      matrix.reduce((acc, item, y, x) => {
        if (y === 0 && x === 1 && counter === 0) { res = true }
        counter += 1
        return acc + item
      })

      assert(res)
    })
    it('should pass acc, item, y, x, and the array to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][1] = 'some value'
      let res = false

      matrix.reduce((acc, item, y, x, array) => {
        if (acc === 'some other value' && y === 0 && x === 1 && item === 'some value' && array.width === 10) { res = true }
        return acc
      }, 'some other value')

      assert(res)
    })
  })
})
