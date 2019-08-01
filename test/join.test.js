/* global it describe */
const assert = require('assert')
const Array2d = require('../index.js')

describe('Array2d', function () {
  describe('#join()', function () {
    it('should return a string, containing all the items in the array joined together by the input string', function () {
      const matrix = new Array2d(5, 10).fill(0)

      matrix.join(',')
        .split('')
        .forEach((item, i) => {
          assert(item === (i % 2 === 0 ? '0' : ','))
        })
    })
    it('should use ",", as the default character', function () {
      const matrix = new Array2d(5, 10).fill(0)

      matrix.join()
        .split('')
        .forEach((item, i) => {
          assert(item === (i % 2 === 0 ? '0' : ','))
        })
    })
    it('should start and end with the first and last character of the array', function () {
      const matrix = new Array2d(5, 10).fill(0)

      assert(matrix.join().charAt(0) === '0')
      assert(matrix.join().charAt(50) === '0')
    })
    it('should join empty items', function () {
      assert(new Array2d(5, 10).join().length === 49)
    })
    it('should return an empty string when width and height are 0', function () {
      assert(new Array2d().join() === '')
    })
  })
})
