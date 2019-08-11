/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('#includes()', function () {
    it('should return true when the value is present', function () {
      const matrix = new Array2d(10, 5).fill(0)
      matrix[3][2] = 'some value'

      assert(matrix.includes('some value') === true)
    })

    it('should return false when the array is dimentionless', function () {
      const matrix = new Array2d()

      assert(matrix.includes('some value') === false)
    })

    it('should return false when the value is not present in empty array', function () {
      const matrix = new Array2d(10, 5)

      assert(matrix.includes('some value') === false)
    })

    it('should return false when the value is not present in full array', function () {
      const matrix = new Array2d(10, 5).fill(0)

      assert(matrix.includes('some value') === false)
    })

    it('should true when multiple matching values are present', function () {
      const matrix = new Array2d(10, 5).fill(0)
      matrix[3][2] = 'same value'
      matrix[3][4] = 'same value'

      assert(matrix.includes('same value') === true)
    })

    it('should return true regardless of item type', function () {
      const matrix = new Array2d(10, 5).fill(0)
      const obj = { red: true, blue: false }

      matrix[3][2] = 'some value'
      matrix[1][4] = 42
      matrix[2][4] = obj

      assert(matrix.includes('some value') === true)

      assert(matrix.includes(42) === true)

      assert(matrix.includes(obj) === true)
    })
  })
})
