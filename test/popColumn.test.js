/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#popColumn()', function () {
    it('should pop out the last column', function () {
      const matrix = new Array2d(10, 10).mapColumns((item, y, array) => {
        return new Array(array.width).fill(y)
      })

      matrix.popColumn()

      assert(matrix.width === 9)
      assert(matrix[0][matrix.width - 1] === 8)
    })

    it('should return the popped column', function () {
      const matrix = new Array2d(10, 10).fill(0).mapColumns((item, y, array) => {
        return new Array(array.width).fill(y)
      })

      const popped = matrix.popColumn()

      assert(popped.length === matrix.height)
      assert(popped[0] === 9)
    })

    it('Should not pop anything when array has width of 0', function () {
      const matrix = new Array2d(10, 0).fill(0)
      matrix.popColumn()

      assert(matrix.width === 0)
    })

    it('should return undefined when no column has been removed', function () {
      const matrix = new Array2d(10, 0).fill(0)

      const popped = matrix.popColumn()
      assert(typeof popped === 'undefined')
    })
  })
})
