/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('toNative()', function () {
    it('should return the 2d array as a native array', function () {
      const libArray = new Array2d(5, 10).fill(null).map((item, y, x) => y * x)
      const nativeArray = libArray.toNative()

      assert(nativeArray[0][0] === 0)
      assert(nativeArray[4][2] === 8)
      assert(nativeArray.length === 5)

      assert(typeof nativeArray.width === 'undefined')
      assert(typeof nativeArray.height === 'undefined')
    })
    it('should remove reference on rows', function () {
      const libArray = new Array2d(5, 10).fill(null).map((item, y, x) => y * x)
      const nativeArray = libArray.toNative()

      nativeArray[0][0] = 100
      assert(libArray[0][0] !== 100)
    })
  })
})
