/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#forEachRow()', function () {
    it('should loop height times', function () {
      const matrix = new Array2d(5, 10).fill(0)

      let counter = 0
      matrix.forEachRow(() => { counter += 1 })

      assert(counter === 5)
    })

    it('should loop pass row, y, and array to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[4][0] = 'some value'
      let res = false

      matrix.forEachRow((row, y, array) => {
        if (y === 4 && row[0] === 'some value' && array.width === 10) { res = true }
      })

      assert(res)
    })

    it('should not loop over an array of height 0', function () {
      const matrix = new Array2d(0, 10).fill(0)

      let counter = 0
      matrix.forEachRow(() => { counter += 1 })

      assert(counter === 0)
    })

    it('should loop over empty rows', function () {
      const matrix = new Array2d(10, 10)

      let counter = 0
      matrix.forEachRow(() => { counter += 1 })

      assert(counter === 10)
    })
  })
})
