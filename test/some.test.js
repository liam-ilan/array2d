/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('some()', function () {
    it('should check that some items match the condition', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[3][3] = 'some item'

      assert(matrix.some((item) => { return item === 'some item' }))
      assert(!matrix.some((item) => { return item === 'some other item' }))
    })

    it('should pass on item, y, x, and array', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][1] = 'some value'
      let res = false

      matrix.some((item, y, x, array) => {
        if (y === 0 && x === 1 && item === 'some value' && array.width === 10) { res = true }
        return false
      })

      assert(res)
    })

    it('should return false when no condition is returned from the callback', function () {
      const matrix = new Array2d(5, 10).fill(14)
      assert(!matrix.some(() => {}))
    })

    it('should not loop over empty items, and return false if the array is filled with empty items', function () {
      const matrix = new Array2d(5, 10)
      let counter = 0

      assert(!matrix.some((item) => { counter += 1 }))

      assert(counter === 0)
    })

    it('should break out of the loop once the condition returns false', function () {
      const matrix = new Array2d(5, 10).fill('some string')
      let counter = 0

      matrix.every((item) => {
        counter += 1
        return typeof item === 'number'
      })

      assert(counter === 1)
    })
  })
})
