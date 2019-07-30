/* global it describe */
const assert = require('assert')
const Array2d = require('../index.js')

describe('Array2d', function () {
  describe('#find()', function () {
    it('should return the first item matching the condition (left to right, top to bottom)', function () {
      const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
        return y * x
      })

      assert(matrix.find((item) => {
        return item > 50
      }) === 54)
    })
    it('should return undefined when there is no matching item', function () {
      const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
        return y * x
      })

      assert(matrix.find((item) => {
        return item > 100
      }) === undefined)
    })
    it('should loop until the item is found', function () {
      const matrix = new Array2d(10, 10).fill(0)
      matrix[0][1] = 1

      let counter = 0

      assert(matrix.find((item) => {
        counter += 1
        return item === 1
      }) === 1)

      assert(counter === 2)
    })
    it('should pass item, y, x, and the array to the callback', function () {
      const matrix = new Array2d(10, 10).fill(0)
      matrix[0][1] = 1

      let res = false
      matrix.find((item, y, x, array) => {
        if (x === 1 && y === 0 && item === 1 && array.width === 10) {
          res = true
        }
        return false
      })

      assert(res)
    })
  })
})
