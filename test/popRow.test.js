/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#popRow()', function () {
    it('should pop out the last row of an array', function () {
      const matrix = new Array2d(10, 10).fill(0).mapRows((item, y, array) => {
        return new Array(array.width).fill(y)
      })

      matrix.popRow()

      assert(matrix.height === 9)
      assert(matrix[matrix.height - 1][0] === 8)
    })

    it('should return the popped row', function () {
      const matrix = new Array2d(10, 10).fill(0).mapRows((item, y, array) => {
        return new Array(array.width).fill(y)
      })

      const popped = matrix.popRow()
      assert(popped.length === matrix.width)
      assert(popped[0] === 9)
    })

    it('Should not pop anything when array has height of 0', function () {
      const matrix = new Array2d(0, 10).fill(0)
      matrix.popRow()

      assert(matrix.height === 0)
    })

    it('should return undefined when no row has been removed', function () {
      const matrix = new Array2d(0, 10).fill(0)
      const popped = matrix.popRow()
      assert(typeof popped === 'undefined')
    })
  })
})
