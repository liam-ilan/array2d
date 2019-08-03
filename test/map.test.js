/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#map()', function () {
    it('should return a new array with the callback applied to each item', function () {
      const matrix = new Array2d(5, 10).fill(0).map((item, y, x) => {
        return y * x
      })

      assert(matrix[2][2] === 4)
      assert(matrix[3][2] === 6)
      assert(matrix[4][9] === 36)
    })

    it('should loop width * height times', function () {
      let counter = 0

      new Array2d(5, 10).fill(0).map((item, y, x) => {
        counter += 1
      })

      assert(counter === 50)
    })

    it('should pass item, y, x, and array', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[1][1] = 1

      let res = false

      matrix.map((item, y, x, array) => {
        if (item === 1 && y === 1 && x === 1 && array.width === 10) res = true
      })

      assert(res)
    })

    it('should not loop over empty items', function () {
      const matrix = new Array2d(5, 10)

      let counter = 0
      matrix.map(() => {
        counter += 1
      })

      assert(counter === 0)
    })

    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)

      let counter = 0

      matrix.map((item, y, x) => {
        counter += 1
      })

      assert(counter === 0)
    })
  })
})
