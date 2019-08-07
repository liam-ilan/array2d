/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#every()', function () {
    it('should check that every item matches the condition', function () {
      const matrix = new Array2d(5, 10).fill(14)

      assert(
        matrix.every((item) => {
          return item === 14
        })
      )
      assert(
        !matrix.some((item) => {
          return item === 13
        })
      )
    })

    it('should pass on item, y, x, and array', function () {
      const matrix = new Array2d(5, 10).fill(15)

      let res = false

      matrix.every((item, y, x, array) => {
        if (y === 2 && x === 1 && item === 15 && array.width === 10) {
          res = true
        }

        return item === 15
      })
      assert(res)
    })

    it('should not loop over empty items', function () {
      const matrix = new Array2d(5, 10)

      let counter = 0

      matrix.every((item) => {
        // disabled, as we expect the counter to be === to 0
        counter += 1 // eslint-disable-line no-unreachable

        return item > 15
      })

      assert(counter === 0)
    })

    it('should not loop over empty array', function () {
      const matrix = new Array2d(0, 0)

      let counter = 0

      matrix.every((item) => {
        // disabled, as we expect the counter to be === to 0
        counter += 1 // eslint-disable-line no-unreachable

        return item > 15
      })

      assert(counter === 0)
    })

    it('should return false when nothing is returned', function () {
      const matrix = new Array2d(5, 10).fill(14)

      assert(
        !matrix.every(() => {})
      )
    })
  })
})
