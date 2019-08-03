/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#every()', function () {
    it('should validate a condition over every item of an array', function () {
      const matrix = new Array2d(5, 10).fill(16)

      assert(
        matrix.every((item) => {
          return item > 15
        })
      )
    })

    it('should pass on item, y, x, and array', function () {
      const matrix = new Array2d(5, 10).fill(16)

      let res = false

      assert(
        matrix.every((item, y, x, array) => {
          if (y === 2 && x === 1 && item === 16 && array.width === 10) {
            res = true
          }
          return item > 15
        })
      )

      assert(res)
      res = true
    })

    it('should not loop over empty items', function () {
      const matrix = new Array2d(5, 10)

      let counter = 0

      const res = matrix.every((item) => {
        return item > 15

        // disabled, as we expect the counter to be === to 0
        counter += 1 // eslint-disable-line no-unreachable
      })

      assert(res)
      assert(counter === 0)
    })

    it('should not loop over empty array', function () {
      const matrix = new Array2d(0, 0)

      let counter = 0

      const res = matrix.every((item) => {
        return item > 15

        // disabled, as we expect the counter to be === to 0
        counter += 1 // eslint-disable-line no-unreachable
      })

      assert(res)
      assert(counter === 0)
    })
  })
})
