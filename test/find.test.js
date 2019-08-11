/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#find()', function () {
    it('should return the first item matching the condition (left to right, top to bottom)', function () {
      const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
        return y * x
      })

      assert(matrix.find((item) => { return item > 50 }) === 54)
    })

    it('should return undefined when there is no matching item', function () {
      const matrix = new Array2d(10, 10).fill(0).map((item, y, x) => {
        return y * x
      })

      assert(matrix.find((item) => { return item > 100 }) === undefined)
    })

    it('should pass item, y, x, and the array to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][1] = 'some value'
      let res = false

      matrix.find((item, y, x, array) => {
        if (y === 0 && x === 1 && item === 'some value' && array.width === 10) { res = true }
      })

      assert(res)
    })

    it('should loop until the item is found', function () {
      const matrix = new Array2d(10, 10).fill(0)
      matrix[0][5] = 'some value'

      let counter = 0

      matrix.find((item) => {
        counter += 1
        return item === 'some value'
      })

      assert(counter === 6)
    })
  })
})
