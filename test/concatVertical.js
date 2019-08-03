/* global it describe */
const assert = require('assert')
const Array2d = require('../index.js')

describe('Array2d', function () {
  describe('#concatVertical()', function () {
    it('should join two arrays', function () {
      const matrix1 = new Array2d(3, 3).fill(0)
      const matrix2 = new Array2d(3, 3).fill(1)

      const matrix3 = matrix1.concatVertical(matrix2)
      assert(matrix3[0][0] === 0)
      assert(matrix3[3][0] === 1)
      assert(matrix3.height === 6)
      assert(matrix3.width === 3)
    })

    it('should join more than two arrays', function () {
      const matrix1 = new Array2d(3, 3).fill(0)
      const matrix2 = new Array2d(3, 3).fill(1)
      const matrix3 = new Array2d(3, 3).fill(2)
      const matrix4 = new Array2d(3, 3).fill(3)

      const matrix5 = matrix1.concatVertical(matrix2, matrix3, matrix4)

      assert(matrix5[0][0] === 0)
      assert(matrix5[3][0] === 1)
      assert(matrix5[6][0] === 2)
      assert(matrix5[9][0] === 3)

      assert(matrix5.height === 12)
      assert(matrix5.width === 3)
    })

    it('should not mutate array', function () {
      const matrix1 = new Array2d(3, 3).fill(0)
      const matrix2 = new Array2d(3, 3).fill(1)
      const matrix3 = new Array2d(3, 3).fill(2)
      const matrix4 = new Array2d(3, 3).fill(3)

      const matrix5 = matrix1.concatVertical(matrix2, matrix3, matrix4)

      assert(matrix5[0][0] === 0)
      assert(matrix5[3][0] === 1)
      assert(matrix5[6][0] === 2)
      assert(matrix5[9][0] === 3)

      assert(matrix5.height === 12)
      assert(matrix5.width === 3)

      assert(matrix1.height === 3)
    })

    it('should not join arrays of wrong widths', function () {
      const matrix1 = new Array2d(3, 3).fill(0)
      const matrix2 = new Array2d(3, 3).fill(1)
      const matrix3 = new Array2d(3, 3).fill(2)
      const matrix4 = new Array2d(3, 4).fill(3)

      const matrix5 = matrix1.concatVertical(matrix2, matrix3, matrix4)

      assert(matrix5[0][0] === 0)
      assert(matrix5[3][0] === 1)
      assert(matrix5[6][0] === 2)

      assert(matrix5.height === 9)
      assert(matrix5.width === 3)
    })
  })
})
