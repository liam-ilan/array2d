/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#pushcolumn()', function () {
    it('should add a column to the end of the array', function () {
      const matrix = new Array2d(10, 10).fill(0)

      matrix.pushColumn(new Array(10).fill(1))

      assert(matrix.width === 11)
      assert(matrix[0][matrix.width - 1] === 1)
    })
    it('should return the new width', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.pushColumn(new Array(10).fill(1)) === matrix.width)
    })
    it('should only push arrays of the right size', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.pushColumn(new Array(9).fill(1)) === 10)
      assert(matrix[0][matrix.width - 1] === 0)
      assert(matrix.width === 10)
    })
    it('should return the same height when input array is of different size', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.pushColumn(new Array(9).fill(1)) === 10)
    })
  })
})
