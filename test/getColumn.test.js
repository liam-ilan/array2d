/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('getColumn()', function () {
    it('should get a Column, and return', function () {
      const arr = new Array2d(10, 10).mapRows((row, i) => new Array(10).fill(i))
      assert(arr.getColumn(3)[5] === arr[5][3])
    })

    it('should remove reference', function () {
      const arr = new Array2d(10, 10).mapRows((row, i) => new Array(10).fill(i))
      const column = arr.getColumn(5)
      column[0] = 'some value'

      assert(column[0] !== arr[0][5])
    })
  })
})
