/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#shiftRow()', function () {
    it('should shift out the first row of an array', function () {
      const matrix = new Array2d(10, 10).fill(0).mapRows((item, y, array) => {
        return new Array(array.width).fill(y)
      })

      matrix.shiftRow()

      assert(matrix.height === 9)
      assert(matrix[0][0] === 1)
    })

    it('should return the shifted row', function () {
      const matrix = new Array2d(10, 10).fill(0).mapRows((item, y, array) => {
        return new Array(array.width).fill(y)
      })

      const shifted = matrix.shiftRow()
      assert(shifted.length === matrix.width)
      assert(shifted[0] === 0)
    })

    it('Should not shift anything when array has height of 0', function () {
      const matrix = new Array2d(0, 10).fill(0)
      matrix.shiftRow()

      assert(matrix.height === 0)
    })

    it('should return undefined when no row has been removed', function () {
      const matrix = new Array2d(0, 10).fill(0)
      const shifted = matrix.shiftRow()
      assert(typeof shifted === 'undefined')
    })
  })
})
