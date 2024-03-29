/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('atRow()', function () {
    it('should get a row, and return', function () {
      const arr = new Array2d(10, 10).mapRows((row, i) => new Array(10).fill(i))
      assert(arr.atRow(5)[3] === arr[5][3])
    })

    it('should keep reference', function () {
      const arr = new Array2d(10, 10).mapRows((row, i) => new Array(10).fill(i))
      const row = arr.atRow(5)
      row[0] = 'some value'

      assert(row[0] === arr[5][0])
    })
  })
})
