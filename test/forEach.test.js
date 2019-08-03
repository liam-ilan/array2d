/* global it describe */
const assert = require('assert')
const Array2d = require('../index.js')

describe('Array2d', function () {
  describe('#forEach()', function () {
    it('should loop width * height times', function () {
      const matrix = new Array2d(5, 10).fill(0)

      let counter = 0
      matrix.forEach(() => {
        counter += 1
      })

      assert(counter === 50)
    })
    it('should not loop over empty items', function () {
      const matrix = new Array2d(5, 10)

      let counter = 0
      matrix.forEach(() => {
        counter += 1
      })

      assert(counter === 0)
    })
    it('should pass item, y, x, and the array to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][1] = 1

      let counter = 0
      let res = false

      matrix.forEach((item, y, x, array) => {
        counter += 1
        if (counter === 2) {
          res = y === 0 && x === 1 && item === 1 && array.width === 10
        }
      })

      assert(res)
    })
    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)

      let counter = 0

      matrix.forEach((item, y, x) => {
        counter += 1
      })

      assert(counter === 0)
    })
  })
})
