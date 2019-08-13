/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#mapRows()', function () {
    it('should return a new array with the callback applied to each row', function () {
      const matrix = new Array2d(10, 10).fill(0).mapRows((row, y, array) => {
        return new Array(array.width).fill(y)
      })

      assert(matrix[0][0] === 0)
      assert(matrix[1][1] === 1)
      assert(matrix[5][5] === 5)
    })

    it('should loop height times', function () {
      let counter = 0
      new Array2d(5, 10).fill(0).mapRows(() => { counter += 1 })

      assert(counter === 5)
    })

    it('should pass row, y, and array', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[4][0] = 'some value'
      let res = false

      matrix.mapRows((row, y, array) => {
        if (y === 4 && row[0] === 'some value' && array.width === 10) { res = true }
      })

      assert(res)
    })

    it('should use an array filled with undefined when no array is returned', function () {
      const matrix = new Array2d(5, 5).fill(0)
      assert(typeof matrix.mapRows(() => {})[2][3] === 'undefined')
    })

    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)
      let counter = 0

      matrix.mapRows(() => { counter += 1 })

      assert(counter === 0)
    })

    it('should loop over empty rows', function () {
      const matrix = new Array2d(10, 10)
      let counter = 0

      matrix.mapRows(() => { counter += 1 })

      assert(counter === 10)
    })

    it('should still loop when width is equal to 0, and pass an empty array', function () {
      const matrix = new Array2d(10, 0)
      let counter = 0

      matrix.mapRows((row, y) => {
        counter += 1
        assert(row.length === 0)
      })

      assert(counter === 10)
    })
  })
})
