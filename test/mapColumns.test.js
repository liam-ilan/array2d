/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#mapColumns()', function () {
    it('should return a new array with the callback applied to each column', function () {
      const matrix = new Array2d(10, 10).fill(0).mapRows((column, x, array) => {
        return new Array(array.height).fill(x)
      })

      assert(matrix[0][0] === 0)
      assert(matrix[1][1] === 1)
      assert(matrix[5][5] === 5)
    })

    it('should loop height times', function () {
      let counter = 0

      new Array2d(5, 10).fill(0).mapColumns((item, y) => {
        counter += 1
      })

      assert(counter === 10)
    })

    it('should pass column, x, and array', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[1][1] = 1

      let res = false

      matrix.mapColumns((column, x, array) => {
        if (column[1] === 1 && x === 1 && array.width === 10) res = true
      })

      assert(res)
    })

    it('should use an array filled with undefined when no array is returned', function () {
      const matrix = new Array2d(5, 5).fill(0)
      assert(matrix.mapColumns(() => {})[2][3] === undefined)
    })

    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)

      let counter = 0

      matrix.mapColumns(() => {
        counter += 1
      })

      assert(counter === 0)
    })
  })
})
