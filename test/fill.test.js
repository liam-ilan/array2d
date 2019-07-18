const assert = require('assert');
const Array2d = require('../index.js')

describe('Array2d', function() {
  describe('#fill()', function() {
    it('should return a full array when no coordianates are given', function() {
      const matrix = new Array2d(5, 10).fill(0)

      res = false

      matrix.forEach(() => {
        res = true
      })

      assert(res)
      assert(matrix.width === 10)
      assert(matrix.height === 5)
    });
    it('should return an array, filled between y1, x1 to y2, x2, when coords ar given', function() {
      const matrix = new Array2d(5, 10).fill(0).fill(1, 1, 2, 4, 8)
      assert(
        matrix[0][0] === 0 && 
        matrix[4][9] === 0 && 
        matrix[1][1] === 0 && 
        matrix[3][8] === 0 && 
        matrix[3][4] === 1
      )
    });
    it('should return an array, filled between y1, x1 to y2, x2, when coords ar given', function() {
      const matrix = new Array2d(5, 10).fill(0).fill(1, 1, 2, 4, 8)
      assert(
        matrix[0][0] === 0 && 
        matrix[4][9] === 0 && 
        matrix[1][1] === 0 && 
        matrix[3][8] === 0 && 
        matrix[3][4] === 1
      )
    });
    it('should both mutate, and return the new array', function() {
      const matrix = new Array2d(5, 10).fill(null)
      let newMatrix = matrix.fill(0)
      assert(matrix[3][3] === 0 && newMatrix[3][3] === 0)
    });
  });
});