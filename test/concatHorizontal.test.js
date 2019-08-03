/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#concatHorizontal()', function () {
    it('should join two arrays', function () {
      const matrix1 = new Array2d(3, 3).fill(0)
      const matrix2 = new Array2d(3, 3).fill(1)

      const matrix3 = matrix1.concatHorizontal(matrix2)
      assert(matrix3[0][0] === 0)
      assert(matrix3[0][3] === 1)
      assert(matrix3.width === 6)
      assert(matrix3.height === 3)
    })

    it('should join more than two arrays', function () {
      const matrix1 = new Array2d(3, 3).fill(0)
      const matrix2 = new Array2d(3, 3).fill(1)
      const matrix3 = new Array2d(3, 3).fill(2)
      const matrix4 = new Array2d(3, 3).fill(3)

      const matrix5 = matrix1.concatHorizontal(matrix2, matrix3, matrix4)

      assert(matrix5[0][0] === 0)
      assert(matrix5[0][3] === 1)
      assert(matrix5[0][6] === 2)
      assert(matrix5[0][9] === 3)

      assert(matrix5.width === 12)
      assert(matrix5.height === 3)
    })

    it('should not mutate array', function () {
      const matrix1 = new Array2d(3, 3).fill(0)
      const matrix2 = new Array2d(3, 3).fill(1)
      const matrix3 = new Array2d(3, 3).fill(2)
      const matrix4 = new Array2d(3, 3).fill(3)

      const matrix5 = matrix1.concatHorizontal(matrix2, matrix3, matrix4)

      assert(matrix5[0][0] === 0)
      assert(matrix5[0][3] === 1)
      assert(matrix5[0][6] === 2)
      assert(matrix5[0][9] === 3)

      assert(matrix5.width === 12)
      assert(matrix5.height === 3)

      assert(matrix1.width === 3)
    })

    it('should not join arrays of wrong heights', function () {
      const matrix1 = new Array2d(3, 3).fill(0)
      const matrix2 = new Array2d(3, 3).fill(1)
      const matrix3 = new Array2d(3, 3).fill(2)
      const matrix4 = new Array2d(4, 3).fill(3)

      const matrix5 = matrix1.concatHorizontal(matrix2, matrix3, matrix4)

      assert(matrix5[0][0] === 0)
      assert(matrix5[0][3] === 1)
      assert(matrix5[0][6] === 2)

      assert(matrix5.width === 9)
      assert(matrix5.height === 3)
    })
  })
})
