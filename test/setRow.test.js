/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('setRow()', function () {
    it('should set a row to an array', function () {
      const arr = new Array2d(10, 10).fill(0)
      arr.setRow(0, new Array(10).fill(1))

      assert(arr[0][0] === 1)
    })

    it('should not maintain reference with the "set" array', function () {
      const arr = new Array2d(10, 10).fill(0)
      const set = new Array(10).fill(1)
      arr.setRow(0, set)

      set[0] = 'some item'

      assert(arr[0][0] === 1)
    })

    it('should resize rest of rows to match size of set row', function () {
      const arr = new Array2d(10, 10).fill(0)
      arr.setRow(0, new Array(5).fill(1))

      assert(arr.width === 5)
      assert(arr[5].length === 5)
    })
  })
})
