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

  // returns a 'cloned' self
  _clone () {
    const res = new Array2d(this.width, this.height)
    res._set(this._getData())
    return res
  }

  // itterative functions

  // foreach
  forEachRow (cb) {
    this._getData().forEach((row, y) => {
      cb(row, y)
    })
  }

  forEach (cb) {
    this.forEachRow((row, y) => {
      row.forEach((item, x) => {
        cb(item, x, y)
      })
    })
  }

  forEachColumn (cb) {
    // empty array for columns
    const columns = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null))

    // for every item, switch axis, and put in columns
    this.forEachRow((row, y) => {
      row.forEach((item, x) => {
        columns[x][y] = item
      })
    })

    // run on columns
    columns.forEach(cb)
  }

  // maps
  mapRows (cb) {
    // arr holds the contents of the result array
    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))

    this.forEachRow((row, y) => {
      arr[y] = cb(row, y)
    })

    // convert arr to new Array2d and return
    const res = new Array2d(this.width, this.height)
    res._set(arr)
    return res
  }

  map (cb) {
    // same as mapRows
    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))

    this.forEach((item, x, y) => {
      arr[y][x] = cb(item, x, y)
    })

    const res = new Array2d(this.width, this.height)
    res._set(arr)
    return res
  }

  mapColumns (cb) {
    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))

    // call the callback for every column, and then map the new column into arr
    this.forEachColumn((column, x) => {
      const newColumn = cb(column, x)

      this.forEachRow((row, y) => {
        arr[y][x] = newColumn[y]
      })
    })

    const res = new Array2d(this.width, this.height)
    res._set(arr)
    return res
  }

  // fills array2d with val
  fill (val, x1 = 0, y1 = 0, x2 = this.width, y2 = this.height) {
    this.forEachRow((row, y) => {
      if (y < y2 && y > y1 - 1) {
        this[y] = this[y].fill(val, x1, x2)
      };
    })
    return this._clone()
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

  // push, pop, unshift, shift for columns
}

module.exports = Array2d
