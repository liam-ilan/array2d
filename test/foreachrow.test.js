/* global it describe */
const assert = require('assert')
const Array2d = require('../index.js')

describe('Array2d', function () {
  describe('#forEachRow()', function () {
    it('should loop height times', function () {
      const matrix = new Array2d(5, 10).fill(0)

      let counter = 0
      matrix.forEachRow(() => {
        counter += 1
      })

      assert(counter === 5)
    })
    it('should loop pass row, y, to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[2][1] = 1

      let res = false
      matrix.forEachRow((row, y) => {
        if (y === 2 && row[1] === 1) {
          res = true
        }
      })

      assert(res)
    })
    it('should not loop over an array of height 0', function () {
      const matrix = new Array2d(0, 10).fill(0)

      let counter = 0
      matrix.forEachRow(() => {
        counter += 1
      })

      assert(counter === 0)
    })
    it('should loop over empty rows', function () {
      const matrix = new Array2d(10, 10)

      let counter = 0
      matrix.forEachRow(() => {
        counter += 1
      })

      assert(counter === 10)
    })
  })
})
