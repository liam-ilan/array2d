/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#filter()', function () {
    it('should return all items matching a condition in a native, 1d array', function () {
      const matrix = new Array2d(5, 10).fill(null).map((item, y, x, array) => y * array.width + x)

      assert(matrix.filter((item) => item > 20).every((item) => item > 20))
      assert(matrix.filter((item) => item > 20).length === 29)
    })

    it('should loop width * height times', function () {
      const matrix = new Array2d(5, 10).fill(0)

      let counter = 0
      matrix.filter(() => { counter += 1 })

      assert(counter === 50)
    })

    it('should not loop over empty items', function () {
      const matrix = new Array2d(5, 10)

      let counter = 0
      matrix.filter(() => { counter += 1 })

      assert(counter === 0)
    })
    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)
      let counter = 0

      matrix.filter((item, y, x) => { counter += 1 })

      assert(counter === 0)
    })
    it('should pass item, y, x, and the array to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][1] = 'some value'
      let res = false

      matrix.filter((item, y, x, array) => {
        if (y === 0 && x === 1 && item === 'some value' && array.width === 10) { res = true }
      })

      assert(res)
    })
    it('should assume the condition is false when nothing is returned', function () {
      const matrix = new Array2d(5, 10).fill(0)

      assert(matrix.filter(() => {}).length === 0)
    })
  })
})
