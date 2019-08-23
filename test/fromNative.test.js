/* global it describe */
const assert = require('assert')
const Array2d = require('../src/index.js')

describe('Array2d', function () {
  describe('fromNative()', function () {
    it('should mutate the original array to match the data from the input array', function () {
      const nativeArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const newArray = new Array2d().fromNative(nativeArray)

      assert(newArray.width === 3)
      assert(newArray.height === 3)
      assert(newArray[1][0] === 4)
      assert(newArray[1][1] === 5)
    })
    it('should return this', function () {
      const nativeArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const newArray = new Array2d().fromNative(nativeArray).map((item) => item * 2)

      assert(newArray.width === 3)
      assert(newArray.height === 3)
      assert(newArray[1][0] === 8)
      assert(newArray[1][1] === 10)
    })
    it("the resulting Array2d's rows should hold refernece to the original array's rows", function () {
      const nativeArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const newArray = new Array2d().fromNative(nativeArray)

      newArray[0][0] = 100
      assert(nativeArray[0][0] === 100)
    })
  })
})
