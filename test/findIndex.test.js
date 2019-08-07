/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#findIndex()', function () {
    it('should return the first items y and x matching the condition (left to right, top to bottom)', function () {
      const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
        return y * x
      })

      const { y, x } = matrix.findIndex((item) => {
        return item > 50
      })

      assert(y === 6 && x === 9)
    })
    it('should return -1, -1 when there is no matching item', function () {
      const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
        return y * x
      })

      const index = matrix.findIndex((item) => {
        return item > 100
      })

      assert(index.x === -1 && index.y === -1)
    })
    it('should loop until the item is found', function () {
      const matrix = new Array2d(10, 10).fill(0)
      matrix[0][1] = 1

      let counter = 0

      matrix.findIndex((item) => {
        counter += 1
        return item === 1
      })

      assert(counter === 2)
    })
    it('should pass item, y, x, and the array to the callback', function () {
      const matrix = new Array2d(10, 10).fill(0)
      matrix[0][1] = 1

      let res = false

      matrix.findIndex((item, y, x, array) => {
        if (x === 1 && y === 0 && item === 1 && array.width === 10) {
          res = true
        }
        return false
      })

      assert(res)
    })
  })
})
