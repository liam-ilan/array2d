/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#fill()', function () {
    it('should return a full array when no coordianates are given', function () {
      const matrix = new Array2d(5, 10).fill(0)

      assert(matrix[2][2] === 0)
      assert(matrix.width === 10)
      assert(matrix.height === 5)
    })
    it('should return an array, filled between y1, x1 to y2, x2, when coords ar given', function () {
      const matrix = new Array2d(5, 10).fill(0).fill(1, 1, 2, 4, 8)
      assert(matrix[0][0] === 0)
      assert(matrix[4][9] === 0)
      assert(matrix[1][1] === 0)
      assert(matrix[3][8] === 0)
      assert(matrix[3][4] === 1)
    })
    it('should use default limits, when invalid input is given', function () {
      const matrix = new Array2d(5, 10).fill(0, 'invalid', 'invalid', 'invalid', 'invalid')
      assert(matrix[2][2] === 0)
      assert(matrix.width === 10)
      assert(matrix.height === 5)
    })
    it('should use default y2 and x2 when y2 and x2 are bigger than they are width and height', function () {
      const matrix = new Array2d(5, 10).fill(0, 0, 0, 1000, 1000)
      assert(matrix[0][0] === 0)
      assert(matrix[4][9] === 0)
      assert(matrix.toNative().length === 5)
    })
    it('should wrap negative inputs', function () {
      const matrix = new Array2d(5, 10).fill(0).fill(1, -2 /* 3 */, -2 /* 8 */, -1 /* 4 */, -1 /* 9 */)
      assert(matrix[3][8] === 1)
      assert(matrix[3][9] === 0)
      assert(matrix[4][8] === 0)
      assert(matrix[3][7] === 0)
      assert(matrix[2][8] === 0)
    })
  })
})
