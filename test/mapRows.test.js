/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#mapRows()', function () {
    it('should return a new array with the callback applied to each row', function () {
      const matrix = new Array2d(10, 10).fill(0).mapRows((item, y, array) => {
        return new Array(array.width).fill(y)
      })

      assert(matrix[0][0] === 0)
      assert(matrix[1][1] === 1)
      assert(matrix[5][5] === 5)
    })

    it('should loop height times', function () {
      let counter = 0

      new Array2d(5, 10).fill(0).mapRows((item, y) => {
        counter += 1
      })

      assert(counter === 5)
    })

    it('should pass row, y, and array', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[1][1] = 1

      let res = false

      matrix.mapRows((row, y, array) => {
        if (row[1] === 1 && y === 1 && array.width === 10) res = true
      })

      assert(res)
    })

    it('should loop over rows of width 0', function () {
      const matrix = new Array2d(5, 0)

      let counter = 0
      matrix.mapRows(() => {
        counter += 1
      })

      assert(counter === 5)
    })

    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)

      let counter = 0

      matrix.mapRows((item, y, x) => {
        counter += 1
      })

      assert(counter === 0)
    })
  })
})
