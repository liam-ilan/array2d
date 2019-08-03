/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#filter()', function () {
    it('should loop width * height times', function () {
      const matrix = new Array2d(5, 10).fill(0)

      let counter = 0
      matrix.filter(() => {
        counter += 1
        return false
      })

      assert(counter === 50)
    })
    it('should not loop over empty items', function () {
      const matrix = new Array2d(5, 10)

      let counter = 0
      matrix.filter(() => {
        counter += 1
        return false
      })

      assert(counter === 0)
    })
    it('should pass item, y, x, and the array to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][1] = 1

      let counter = 0
      let res = false

      matrix.filter((item, y, x, array) => {
        counter += 1

        if (counter === 2) {
          res = y === 0 && x === 1 && item === 1 && array.width === 10
        }

        return false
      })

      assert(res)
    })
    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)

      let counter = 0

      matrix.filter((item, y, x) => {
        counter += 1
        return false
      })

      assert(counter === 0)
    })
    it('should assume the condition is false when nothing is returned', function () {
      const matrix = new Array2d(5, 10).fill(0)

      assert(matrix.filter(() => {}).length === 0)
    })
    it('should return a 1d array', function () {
      const matrix = new Array2d(5, 10).fill(10)

      assert(matrix.filter((item) => item > 9).length === 50)
    })
  })
})
