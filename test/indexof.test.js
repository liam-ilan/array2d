const assert = require('assert');
const Array2d = require('../index.js')

describe('Array2d', function() {
  describe('#indexOf()', function() {
    it('should return {x: -1, y: -1} when the array is dimentionless', function() {
      const matrix = new Array2d()

      assert(matrix.indexOf('some value').x === -1)
      assert(matrix.indexOf('some value').y === -1)
    });
    it('should return {x: -1, y: -1} when the value is not present in empty array', function() {
      const matrix = new Array2d(10, 5)

      assert(matrix.indexOf('some value').x === -1)
      assert(matrix.indexOf('some value').y === -1)
    });
    it('should return {x: -1, y: -1} when the value is not present in full array', function() {
      const matrix = new Array2d(10, 5).fill(0)

      assert(matrix.indexOf('some value').x === -1)
      assert(matrix.indexOf('some value').y === -1)
    });
    it('should return {x: index of item, y: index of item} when the value is present', function() {
      const matrix = new Array2d(10, 5).fill(0)
      matrix[3][2] = 'some value'

      assert(matrix.indexOf('some value').x === 2)
      assert(matrix.indexOf('some value').y === 3)
    });
    it('should return only first occurence of item when multiple matching values are present', function() {
      const matrix = new Array2d(10, 5).fill(0)
      matrix[3][2] = 'same value'
      matrix[3][4] = 'same value'

      assert(matrix.indexOf('same value').x === 2)
      assert(matrix.indexOf('same value').y === 3)
    });
    it('should return {x: index of item, y: index of item} regardless of item type', function() {
      const matrix = new Array2d(10, 5).fill(0)
      const obj = {red: true, blue: false}
      
      matrix[3][2] = 'some value'
      matrix[1][4] = 42
      matrix[2][4] = obj

      assert(matrix.indexOf('some value').x === 2)
      assert(matrix.indexOf('some value').y === 3)

      assert(matrix.indexOf(42).x === 4)
      assert(matrix.indexOf(42).y === 1)

      assert(matrix.indexOf(obj).x === 4)
      assert(matrix.indexOf(obj).y === 2)
    });
  });
});