class Array2d {
  constructor (w, h) {
    this.width = w
    this.height = h
    this._set(new Array(h).fill(null).map(() => new Array(w)))
  }

  // clear this objects "array"
  _clear () {
    let i = 0
    while (this[i] !== undefined) {
      delete this[i]
      i += 1
    }
  }

  // sets this object to an array
  _set (arr) {
    this._clear()

    arr.forEach((item, i) => {
      this[i.toString()] = item
    })
  }

  // converts Array2d to normal matrix and returns
  _getData () {
    return new Array(this.height).fill(null).map((row, y) => this[y])
  }

  // itterative functions
  forEach (cb) {
    let y = 0

    while (this[y] !== undefined) {
      this[y].forEach((item, x) => {
        cb(item, x, y)
      })
      y += 1
    }
  }

  map (cb) {
    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))

    this.forEach((item, x, y) => {
      arr[y][x] = cb(item, x, y)
    })

    const res = new Array2d(this.width, this.height)
    res._set(arr)
    return res
  }

  // fills array2d with val
  fill (val) {
    for (let y = 0; y < this.height; y += 1) {
      this[y] = new Array(this.width).fill(val)
    }
  }

  // push, pop, unshift, shift for rows
  pushRow (row) {
    this[this.height] = row
    this.height += 1

    return this.height
  }

  popRow () {
    const res = this[this.height - 1]
    delete this[this.height - 1]

    this.height -= 1
    return res
  }

  unshiftRow (row) {
    const currentData = this._getData()
    const res = currentData.unshift(row)
    this._set(currentData)

    this.height += 1
    return res
  }

  shiftRow () {
    const currentData = this._getData()
    const res = currentData.shift()
    this._set(currentData)

    this.height -= 1
    return res
  }
}

module.exports = Array2d
