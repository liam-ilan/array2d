/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

// note: both forEachColumn and forEachRow ignore if the row is "empty", and always loop over it
describe('Array2d', function () {
  describe('#forEach()', function () {
    it('should loop width * height times', function () {
      const matrix = new Array2d(5, 10).fill(0)
      let counter = 0

      matrix.forEach(() => { counter += 1 })

      assert(counter === 50)
    })

    it('should pass item, y, x, and the array to the callback', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][1] = 'some value'
      let res = false

      matrix.forEach((item, y, x, array) => {
        if (y === 0 && x === 1 && item === 'some value' && array.width === 10) { res = true }
      })

      assert(res)
    })

    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)
      let counter = 0

      matrix.forEach((item, y, x) => { counter += 1 })

      assert(counter === 0)
    })

    it('should not loop over empty items', function () {
      const matrix = new Array2d(5, 10)
      matrix[3][3] = 'some value'
      let counter = 0

      matrix.forEach((item, y, x) => {
        counter += 1
        assert(item === 'some value' && y === 3 && x === 3)
      })

      assert(counter === 1)
    })
  })
})
