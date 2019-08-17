/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#shiftColumn()', function () {
    it('should shift out the last column', function () {
      const matrix = new Array2d(10, 10).mapColumns((item, x, array) => {
        return new Array(array.height).fill(x)
      })

      matrix.shiftColumn()

      assert(matrix.width === 9)
      assert(matrix[0][0] === 1)
    })

    it('should return the shifted column', function () {
      const matrix = new Array2d(10, 10).fill(0).mapColumns((item, x, array) => {
        return new Array(array.height).fill(x)
      })

      const shifted = matrix.shiftColumn()

      assert(shifted.length === matrix.height)
      assert(shifted[0] === 0)
    })

    it('should not shift anything when array has width of 0', function () {
      const matrix = new Array2d(10, 0).fill(0)
      matrix.shiftColumn()

      assert(matrix.width === 0)
    })

    it('should return undefined when no column has been removed', function () {
      const matrix = new Array2d(10, 0).fill(0)

      const shifted = matrix.shiftColumn()
      assert(typeof shifted === 'undefined')
    })
  })
})
