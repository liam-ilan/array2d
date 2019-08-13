/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#pushRow()', function () {
    it('should add a row to the end of the array', function () {
      const matrix = new Array2d(10, 10).fill(0)

      matrix.pushRow(new Array(10).fill(1))

      assert(matrix.height === 11)
      assert(matrix[matrix.height - 1][0] === 1)
    })

    it('should return the new height', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.pushRow(new Array(10).fill(1)) === matrix.height)
    })

    it('should only push arrays of the right size', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.pushRow(new Array(9).fill(1)) === 10)
      assert(matrix[matrix.height - 1][0] === 0)
      assert(matrix.height === 10)
    })

    it('should return the same height when input array is of different size', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.pushRow(new Array(9).fill(1)) === 10)
    })

    it('should be able to push multiple rows', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.pushRow(new Array(10).fill(1), new Array(10).fill(2), new Array(10).fill(3)) === 13)
      assert(matrix[12][0] === 3)
      assert(matrix[11][0] === 2)
      assert(matrix[10][0] === 1)
    })
  })
})
