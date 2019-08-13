/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#mapColumns()', function () {
    it('should return a new array with the callback applied to each column', function () {
      const matrix = new Array2d(10, 10).fill(0).mapColumns((column, x, array) => {
        return new Array(array.height).fill(x)
      })

      assert(matrix[0][0] === 0)
      assert(matrix[1][1] === 1)
      assert(matrix[5][5] === 5)
    })

    it('should loop width times', function () {
      let counter = 0
      new Array2d(5, 10).fill(0).mapColumns(() => { counter += 1 })

      assert(counter === 10)
    })

    it('should pass column, x, and array', function () {
      const matrix = new Array2d(5, 10).fill(0)
      matrix[0][4] = 'some value'
      let res = false

      matrix.mapColumns((column, x, array) => {
        if (x === 4 && column[0] === 'some value' && array.width === 10) { res = true }
      })

      assert(res)
    })

    it('should use an array filled with undefined when no array is returned', function () {
      const matrix = new Array2d(5, 5).fill(0)
      assert(typeof matrix.mapColumns(() => {})[2][3] === 'undefined')
    })

    it('should not loop over an empty array', function () {
      const matrix = new Array2d(0, 0)
      let counter = 0

      matrix.mapColumns(() => { counter += 1 })

      assert(counter === 0)
    })

    it('should loop over empty columns', function () {
      const matrix = new Array2d(10, 10)
      let counter = 0

      matrix.mapColumns(() => { counter += 1 })

      assert(counter === 10)
    })

    it('should still loop when height is equal to 0, and pass an empty array', function () {
      const matrix = new Array2d(0, 10)
      let counter = 0

      matrix.mapColumns((column, x) => {
        counter += 1
        assert(column.length === 0)
      })

      assert(counter === 10)
    })
  })
})
