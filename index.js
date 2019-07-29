class Array2d {
  constructor (h = 0, w = 0) {
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
    return new Array(this.height).fill(null).map((row, y) => this[y].concat())
  }

  // returns a 'cloned' self
  _clone () {
    const res = new Array2d(this.height, this.width)
    res._set(this._getData())
    return res
  }

  // itterative functions

  // foreach
  forEachRow (cb) {
    this._getData().forEach((row, y) => {
      cb(row, y, this)
    })
  }

  forEach (cb) {
    this.forEachRow((row, y) => {
      row.forEach((item, x) => {
        cb(item, y, x, this)
      })
    })
  }

  forEachColumn (cb) {
    // empty array for columns
    const columns = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null))

    // for every item, switch axis, and put in columns
    this.forEach((item, y, x) => {
      columns[x][y] = item
    })

    // run on columns
    columns.forEach((column, x) => {
      cb(column, x, this)
    })
  }

  // maps
  mapRows (cb) {
    // arr holds the contents of the result array
    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))

    this.forEachRow((row, y) => {
      arr[y] = cb(row, y, this)
    })

    // convert arr to new Array2d and return
    const res = new Array2d(this.height, this.width)
    res._set(arr)
    return res
  }

  map (cb) {
    // same as mapRows
    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))

    this.forEach((item, y, x) => {
      arr[y][x] = cb(item, y, x, this)
    })

    const res = new Array2d(this.height, this.width)
    res._set(arr)
    return res
  }

  mapColumns (cb) {
    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))

    // call the callback for every column, and then map the new column into arr
    this.forEachColumn((column, x) => {
      const newColumn = cb(column, x, this)

      this.forEachRow((row, y) => {
        arr[y][x] = newColumn[y]
      })
    })

    const res = new Array2d(this.height, this.width)
    res._set(arr)
    return res
  }

  // every
  every (cb) {
    let res = true

    this.forEach((item, y, x) => {
      res = res === true ? cb(item, y, x, this) : res
    })

    return res
  }

  // filter
  filter (cb) {
    const res = []
    this.forEach((item, y, x) => {
      if (cb(item, y, x, this)) {
        res.push(item)
      }
    })
    return res
  }

  // fills array2d with val
  fill (val, y1 = 0, x1 = 0, y2 = this.height, x2 = this.width) {
    if (typeof y1 !== 'number') { y1 = 0 };
    if (typeof x1 !== 'number') { x1 = 0 };
    if (typeof y2 !== 'number') { y2 = this.height };
    if (typeof x2 !== 'number') { x2 = this.width };

    y1 = y1 < 0 ? this.height + y1 : y1
    x1 = x1 < 0 ? this.width + x1 : x1
    y2 = y2 < 0 ? this.height + y2 : y2
    x2 = x2 < 0 ? this.width + x2 : x2

    this.forEachRow((row, y) => {
      if (y < y2 && y > y1 - 1) {
        this[y] = this[y].fill(val, x1, x2)
      };
    })
    return this._clone()
  }

  indexOf (val) {
    const res = [-1, -1]
    this.forEachRow((row, y) => {
      if (row.indexOf(val) !== -1 && res[1] === -1) {
        res[1] = row.indexOf(val)
        res[0] = y
      }
    })
    return res
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
  pushColumn (column) {
    this.forEachRow((row, y) => { this[y].push(column[y]) })
    this.width += 1
    return this.width
  }

  popColumn () {
    this.forEachRow((row, y) => { this[y].pop() })
    this.width -= 1
    return this.width
  }

  unshiftColumn (column) {
    this.forEachRow((row, y) => { this[y].unshift(column[y]) })
    this.width += 1
    return this.width
  }

  shiftColumn () {
    this.forEachRow((row, y) => { this[y].shift() })
    this.width -= 1
    return this.width
  }

  // concat
  concatHorizontal (...arrays) {
    const res = this._clone()

    arrays.forEach((array, i) => {
      if (array.height === this.height) {
        array.forEachColumn((column) => {
          res.pushColumn(column)
        })
      }
    })

    return res
  }

  concatVertical (...arrays) {
    const res = this._clone()

    arrays.forEach((array, i) => {
      if (array.width === this.width) {
        array.forEachRow((row) => {
          res.pushRow(row)
        })
      }
    })

    return res
  }
}

module.exports = Array2d
