/* global it describe */
const assert = require('assert')
const Array2d = require('../index.js')

describe('Array2d', function () {
  describe('#indexOf()', function () {
    it('should return [-1, -1] when the array is dimentionless', function () {
      const matrix = new Array2d()

      assert(matrix.indexOf('some value')[1] === -1)
      assert(matrix.indexOf('some value')[0] === -1)
    })
    it('should return [-1, -1] when the value is not present in empty array', function () {
      const matrix = new Array2d(10, 5)

      assert(matrix.indexOf('some value')[1] === -1)
      assert(matrix.indexOf('some value')[0] === -1)
    })
    it('should return [-1, -1] when the value is not present in full array', function () {
      const matrix = new Array2d(10, 5).fill(0)

      assert(matrix.indexOf('some value')[1] === -1)
      assert(matrix.indexOf('some value')[0] === -1)
    })
    it('should return [y of item, x of item] when the value is present', function () {
      const matrix = new Array2d(10, 5).fill(0)
      matrix[3][2] = 'some value'

      assert(matrix.indexOf('some value')[1] === 2)
      assert(matrix.indexOf('some value')[0] === 3)
    })
    it('should return only first occurence of item when multiple matching values are present', function () {
      const matrix = new Array2d(10, 5).fill(0)
      matrix[3][2] = 'same value'
      matrix[3][4] = 'same value'

      assert(matrix.indexOf('same value')[1] === 2)
      assert(matrix.indexOf('same value')[0] === 3)
    })
    it('should return [y of item, x of item] regardless of item type', function () {
      const matrix = new Array2d(10, 5).fill(0)
      const obj = { red: true, blue: false }

      matrix[3][2] = 'some value'
      matrix[1][4] = 42
      matrix[2][4] = obj

      assert(matrix.indexOf('some value')[1] === 2)
      assert(matrix.indexOf('some value')[0] === 3)

      assert(matrix.indexOf(42)[1] === 4)
      assert(matrix.indexOf(42)[0] === 1)

      assert(matrix.indexOf(obj)[1] === 4)
      assert(matrix.indexOf(obj)[0] === 2)
    })
  })
})
