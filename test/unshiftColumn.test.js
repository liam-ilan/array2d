/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#unshiftColumn()', function () {
    it('should add a column to the start of the array', function () {
      const matrix = new Array2d(10, 10).fill(0)
      matrix.unshiftColumn(new Array(10).fill(1))

      assert(matrix.width === 11)
      assert(matrix[0][0] === 1)
    })

    it('should return the new width', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.unshiftColumn(new Array(10).fill(1)) === matrix.width)
    })

    it('should only unshift arrays of the right size', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.unshiftColumn(new Array(9).fill(1)) === 10)
      assert(matrix[0][0] === 0)
      assert(matrix.width === 10)
    })

    it('should be able to unshift multiple columns', function () {
      const matrix = new Array2d(10, 10).fill(0)

      assert(matrix.unshiftColumn(new Array(10).fill(1), new Array(10).fill(2), new Array(10).fill(3)) === 13)
      assert(matrix[0][0] === 3)
      assert(matrix[0][1] === 2)
      assert(matrix[0][2] === 1)
    })
  })
})
