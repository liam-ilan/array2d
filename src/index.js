class Array2d {
  constructor (h = 0, w = 0) {
    this.width = w
    this.height = h
    this._set(new Array(h).fill(null).map(() => new Array(w)))
  }

  // clear this objects "array"
  _clear () {
    let i = 0
    while (typeof this[i] !== 'undefined') {
      delete this[i]
      i += 1
    }
  }

  // sets this object to an array
  _set (arr) {
    this._clear()

    // foreach goes over each row, and not each item
    arr.forEach((item, i) => {
      // create keys for direct access
      // e.g. arr[4][2]
      this[i.toString()] = item
    })
  }

  // returns a 'cloned' self
  _clone () {
    const res = new Array2d(this.height, this.width)
    res._set(this.toNative())
    return res
  }

  // converts Array2d to normal matrix and returns
  toNative () {
    // we expect an empty array to return rows of empty items
    // must use concat, and not spread, as spread creates undefined items
    return new Array(this.height).fill(null).map((row, y) => this[y].concat())
  }

  fromNative (arr) {
    this.height = arr.length
    this.width = arr.length === 0 ? 0 : arr[0].length
    this._set(arr)
    // chain
    return this
  }

  // get and set
  getColumn (index) {
    const column = []
    for (let y = 0; y < this.height; y += 1) {
      column.push(this[y][index])
    }
    return column
  }

  getRow (index) {
    return this[index]
  }

  setColumn (index, arr) {
    if (arr.length === this.height) {
      for (let y = 0; y < this.height; y += 1) {
        this[y][index] = arr[y]
      }
    }
  }

  setRow (index, arr) {
    if (arr.length === this.width) {
      this[index] = arr
    }
  }

  // itterative functions

  // foreach

  // basic loop over rows
  forEachRow (func) {
    let y = 0
    while (typeof this[y] !== 'undefined') {
      func(this[y], y, this)
      y += 1
    }
  }

  forEach (func) {
    this.forEachRow((row, y) => {
      row.forEach((item, x) => {
        func(item, y, x, this)
      })
    })
  }

  forEachColumn (func) {
    for (var x = 0; x < this.width; x += 1) {
      // gather column
      const column = this.getColumn(x)

      // call
      func(column, x, this)
    }
  }

  // maps
  mapRows (func) {
    const arr = this.toNative().map((row, y) => {
      return func(row, y, this) || new Array(this.width).fill(undefined)
    })

    return new Array2d().fromNative(arr)
  }

  map (func) {
    return this.mapRows((row, y) => {
      return row.map((item, x) => {
        return func(item, y, x, this)
      })
    })
  }

  mapColumns (func) {
    const res = this._clone()

    res.forEachColumn((column, x) => {
      res.setColumn(x, func(column, x, this) || new Array(this.height).fill(undefined))
    })

    return res
  }

  every (func) {
    let y = 0

    while (typeof this[y] !== 'undefined') {
      if (!this[y].every((item, x) => func(item, y, x, this))) return false
      y += 1
    }

    return true
  }

  some (func) {
    let y = 0

    while (typeof this[y] !== 'undefined') {
      if (this[y].some((item, x) => func(item, y, x, this))) return true
      y += 1
    }

    return false
  }

  filter (func) {
    const res = []

    this.forEach((item, y, x) => {
      if (func(item, y, x, this)) {
        res.push(item)
      }
    })

    return res
  }

  reduce (func, initialValue) {
    let accumulator = typeof initialValue === 'undefined' ? this[0][0] : initialValue

    this.forEach((item, y, x) => {
      if (y === 0 && x === 0 && typeof initialValue === 'undefined') return null
      accumulator = func(accumulator, item, y, x, this)
    })

    return accumulator
  }

  find (func) {
    let res
    let y = 0

    while (typeof this[y] !== 'undefined') {
      res = this[y].find((item, x) => { return func(item, y, x, this) })

      if (res !== undefined) break
      y += 1
    }

    return res
  }

  findIndex (func) {
    return this.indexOf(this.find(func))
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
    return this
  }

  indexOf (val) {
    // init res
    const res = { y: -1, x: -1 }

    let y = 0

    // for every row
    for (const row of this.toNative()) {
      // x result = index of val
      res.x = row.indexOf(val)

      // y result = y if x was found
      res.y = res.x !== -1 ? y : -1

      // if found, break
      if (res.y !== -1) { break }

      y += 1
    }

    return res
  }

  includes (val) {
    return this.indexOf(val).x !== -1
  }

  join (str = ',') {
    return this.toNative().join(str)
  }

  // push, pop, unshift, shift for rows
  pushRow (...rows) {
    rows.forEach((row) => {
      if (row.length !== this.width) { return this.height }
      this[this.height] = row
      this.height += 1
    })

    return this.height
  }

  popRow () {
    const res = this[this.height - 1]
    delete this[this.height - 1]

    this.height -= this.height > 0 ? 1 : 0
    return res
  }

  unshiftRow (...rows) {
    const data = this.toNative()

    rows.forEach((row) => {
      if (row.length !== this.width) { return this.height }
      data.unshift(row)
    })

    this.fromNative(data)
    return this.height
  }

  shiftRow () {
    const data = this.toNative()
    const res = data.shift()
    this.fromNative(data)
    return res
  }

  // push, pop, unshift, shift for columns
  pushColumn (...columns) {
    columns.forEach((column) => {
      if (column.length === this.height) {
        this.setColumn(this.width, column)
        this.width += 1
      }
    })

    return this.width
  }

  popColumn () {
    let popped = []
    this.forEachRow((row, y) => { popped.push(this[y].pop()) })

    popped = typeof popped[0] === 'undefined' ? undefined : popped
    this.width -= this.width > 0 ? 1 : 0
    return popped
  }

  unshiftColumn (...columns) {
    const data = this.toNative()

    columns.forEach((column) => {
      if (column.length !== this.height) { return this.width }
      column.forEach((item, i) => { data[i].unshift(item) })
    })

    this.fromNative(data)
    return this.width
  }

  shiftColumn () {
    let shifted = []
    this.forEachRow((row, y) => { shifted.push(this[y].shift()) })

    shifted = typeof shifted[0] === 'undefined' ? undefined : shifted
    this.width -= this.width > 0 ? 1 : 0
    return shifted
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
