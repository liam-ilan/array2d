/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')
describe('Array2d', function () {
  describe('getRow()', function () {
    it('should get a row, and return', function () {
      const arr = new Array2d(10, 10).mapRows((row, i) => new Array(10).fill(i))
      assert(arr.getRow(5)[3] === arr[5][3])
    })
    it('should remove reference', function () {
      const arr = new Array2d(10, 10).mapRows((row, i) => new Array(10).fill(i))
      const row = arr.getRow(5)
      row[0] = 'some value'

      assert(row[0] !== arr[5][0])
    })
  })
})
