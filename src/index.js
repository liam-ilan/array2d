class Array2d {
  constructor (h = 0, w = 0) {
    this._width = w
    this._height = h

    if (typeof this[0] === 'undefined') {
      for (let i = 0; i < h; i += 1) {
        // create keys for direct access
        // e.g. arr[4][2]
        this[i] = new Array(w)
      }
    }
  }

  // setting width and height is equivalent to setting length of native array
  set width (w) {
    this.forEachRow((row) => { row.length = w })
    this._width = w
  }

  get width () {
    return this._width
  }

  set height (h) {
    if (h > this.height) {
      for (let i = this.height; i < h; i += 1) {
        this[i] = new Array(this.width)
      }
    }

    if (h < this.height) {
      for (let i = this.height; i >= h; i -= 1) {
        delete this[i]
      }
    }

    this._height = h
  }

  get height () {
    return this._height
  }

  // clear this object's keys (used by fromNative)
  _clear () {
    let i = 0
    while (typeof this[i] !== 'undefined') {
      delete this[i]
      i += 1
    }
  }

  // set this object's keys (used by fromNative))
  _set (arr) {
    arr.forEach((row, i) => {
      // create keys for direct access
      // e.g. arr[4][2]
      this[i] = row
    })
  }

  static isArray2d (arr) {
    return arr instanceof Array2d
  }

  // creates an Array2d from native Array and returns
  fromNative (arr) {
    this.height = arr.length
    this.width = arr.length === 0 ? 0 : arr[0].length

    this._clear()
    this._set(arr)

    // chain
    return this
  }

  // same as fromNative, but static (supposed to be equivalent of Array.from)
  static fromNative (arr) {
    const height = arr.length
    const width = arr.length === 0 ? 0 : arr[0].length
    const res = new Array2d(height, width)

    res._clear()
    res._set(arr)

    // chain
    return res
  }

  // converts Array2d to native Array and returns
  toNative () {
    // we expect an empty array to return rows of empty items
    // must use concat, and not spread, as spread creates undefined items.
    return new Array(this.height).fill(null).map((row, y) => this[y].concat())
  }

  // get and set
  atColumn (index) {
    const column = []
    for (let y = 0; y < this.height; y += 1) {
      column.push(this[y][index])
    }
    return column
  }

  atRow (index) {
    // must use concat, and not spread, as spread creates undefined items
    return this[index].concat()
  }

  at (y, x) {
    return this[y][x]
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
      this[index] = arr.concat()
    }
  }

  flat () {
    return this.toNative().flat()
  }
  // iterative functions

  // forEach

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
    for (let x = 0; x < this.width; x += 1) {
      const column = this.atColumn(x)
      func(column, x, this)
    }
  }

  // maps
  mapRows (func) {
    const res = new Array2d(this.height, this.width)

    this.forEachRow((item, y, array) => {
      res[y] = func(item, y, array) || new Array(this.width).fill(undefined)
    })

    return res
  }

  map (func) {
    return this.mapRows((row, y) => {
      return row.map((item, x) => {
        return func(item, y, x, this)
      })
    })
  }

  mapColumns (func) {
    const res = new Array2d(this.height, this.width)

    this.forEachColumn((column, x) => {
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

  everyColumn (func) {
    let res = true

    for (let x = 0; x < this.width; x += 1) {
      const column = this.atColumn(x)

      if (!func(column, x, this)) {
        res = false
        break
      }

      x += 1
    }

    return res
  }

  everyRow (func) {
    let res = true
    let y = 0

    while (typeof this[y] !== 'undefined') {
      if (!func(this[y], y, this)) {
        res = false
        break
      }

      y += 1
    }

    return res
  }

  some (func) {
    let y = 0

    while (typeof this[y] !== 'undefined') {
      if (this[y].some((item, x) => func(item, y, x, this))) return true
      y += 1
    }

    return false
  }

  someRow (func) {
    return this.toNative().some((row, y) => func(row, y, this))
  }

  someColumn (func) {
    for (let x = 0; x < this.width; x += 1) {
      const column = this.atColumn(x)
      if (func(column, x, this)) return true
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

  filterRows (func) {
    const res = new Array2d(0, this.width)

    this.forEachRow((row, y) => {
      if (func(row, y, this)) res.pushRow(row)
    })

    return res
  }

  filterColumns (func) {
    const res = new Array2d(this.height, 0)

    this.forEachColumn((column, x) => {
      if (func(column, x, this)) res.pushColumn(column)
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

  reduceRows (func, initialValue) {
    // test if initialValue is undefined, and if true, do not pass to reduce
    if (typeof initialValue === 'undefined') return this.toNative().reduce((acc, row, y) => func(acc, row, y, this))
    else return this.toNative().reduce((acc, row, y) => func(acc, row, y, this), initialValue)
  }

  reduceColumns (func, initialValue) {
    let accumulator = typeof initialValue === 'undefined' ? this.atColumn(0) : initialValue

    this.forEachColumn((column, x) => {
      if (x === 0 && typeof initialValue === 'undefined') return null
      accumulator = func(accumulator, column, x, this)
    })

    return accumulator
  }

  reduceReverse (func, initialValue) {
    const copy = this.clone()

    return copy.reverseRows().reverseColumns().reduce(
      (item, y, x) => func(item, this.height - 1 - y, this.width - 1 - x, this),
      initialValue
    )
  }

  reduceRowsReverse (func, initialValue) {
    const copy = this.clone()

    return copy.reverseRows().reduceRows(
      (row, y) => func(row, this.height - 1 - y, this),
      initialValue
    )
  }

  reduceColumnsReverse (func, initialValue) {
    const copy = this.clone()

    return copy.reverseColumns().reduceColumns(
      (column, x) => func(column, this.width - 1 - x, this),
      initialValue
    )
  }

  find (func) {
    let res
    let y = 0

    while (typeof this[y] !== 'undefined') {
      res = this[y].find((item, x) => func(item, y, x, this))

      if (typeof res !== 'undefined') break
      y += 1
    }

    return res
  }

  findLast (func) {
    return this.clone().reverseRows().reverseColumns().find(
      (item, y, x) => func(item, this.height - y - 1, this.width - x - 1, this)
    )
  }

  findRow (func) {
    return this.toNative().find((item, y) => func(item, y, this))
  }

  findLastRow (func) {
    return this.clone().reverseRows().findRow(
      (item, y) => func(item, this.height - y - 1, this)
    )
  }

  findColumn (func) {
    let res

    for (let x = 0; x < this.width; x += 1) {
      const column = this.atColumn(x)

      if (func(column, x, this) === true) {
        res = column
        break
      }
    }

    return res
  }

  findLastColumn (func) {
    return this.clone().reverseColumns().findColumn(
      (item, x) => func(item, this.width - x - 1, this)
    )
  }

  findIndex (func) {
    return this.indexOf(this.find(func))
  }

  findLastIndex (func) {
    return this.lastIndexOf(this.findLast(func))
  }

  findRowIndex (func) {
    return this.indexOfRow(this.findRow(func))
  }

  findLastRowIndex (func) {
    return this.lastIndexOfRow(this.findLastRow(func))
  }

  findColumnIndex (func) {
    return this.indexOfColumn(this.findColumn(func))
  }

  findLastColumnIndex (func) {
    return this.lastIndexOfColumn(this.findLastColumn(func))
  }

  sort (comapareFunc) {
    let arr = []

    this.forEachRow((row) => {
      arr = arr.concat(row)
    })

    arr.sort(comapareFunc)

    this.forEachRow((row, y) => {
      this[y] = arr.slice(y * this.width, (y + 1) * this.width)
    })

    return this
  }

  sortRows (compareFunc) {
    this._set(this.toNative().sort(compareFunc))

    return this
  }

  sortColumns (compareFunc) {
    // rotate array, such that rows are columns
    const rotatedArray2d = new Array2d(0, this.height)
    this.forEachColumn((column) => rotatedArray2d.pushRow(column))

    // sort rows
    rotatedArray2d.sortRows(compareFunc)

    // swap columns back to correct orientation, in native array
    const nativeArray = []
    rotatedArray2d.forEachColumn((row) => nativeArray.push(row))

    // overide and return
    this._set(nativeArray)
    return this
  }

  // utility

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

  slice (y1 = 0, x1 = 0, y2 = this.height, x2 = this.width) {
    if (typeof y1 !== 'number') { y1 = 0 };
    if (typeof x1 !== 'number') { x1 = 0 };
    if (typeof y2 !== 'number') { y2 = this.height };
    if (typeof x2 !== 'number') { x2 = this.width };

    y1 = y1 < 0 ? this.height + y1 : y1
    x1 = x1 < 0 ? this.width + x1 : x1
    y2 = y2 < 0 ? this.height + y2 : y2
    x2 = x2 < 0 ? this.width + x2 : x2

    const res = new Array2d(y2 - y1, x2 - x1)

    for (let y = y1; y < y2; y += 1) {
      for (let x = x1; x < x2; x += 1) {
        res[y - y1][x - x1] = this[y][x]
      }
    }

    return res
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

  indexOfRow (row) {
    let y = 0

    while (typeof this[y] !== 'undefined') {
      if (
        row.length === this[y].length &&
        row.every((item, x) => item === this[y][x])
      ) return y
      y += 1
    }

    return -1
  }

  indexOfColumn (column) {
    for (let x = 0; x < this.width; x += 1) {
      const checkingColumn = this.atColumn(x)

      if (
        column.length === checkingColumn.length &&
        column.every((item, x) => item === checkingColumn[x])
      ) return x
    }

    return -1
  }

  lastIndexOf (val) {
    // init res
    const res = { y: -1, x: -1 }

    // for every row
    for (let y = this.height - 1; y >= 0; y -= 1) {
      // x result = index of val
      res.x = this[y].lastIndexOf(val)

      // y result = y if x was found
      res.y = res.x !== -1 ? y : -1

      // if found, break
      if (res.y !== -1) { break }
    }

    return res
  }

  lastIndexOfRow (row) {
    const indexOfRowReversed = this.clone().reverseRows().indexOfRow(row)

    return indexOfRowReversed === -1 ? -1 : this.height - 1 - indexOfRowReversed
  }

  lastIndexOfColumn (column) {
    const indexOfColumnReversed = this.clone().reverseColumns().indexOfColumn(column)

    return indexOfColumnReversed === -1 ? -1 : this.width - 1 - indexOfColumnReversed
  }

  includes (val) {
    return this.indexOf(val).x !== -1
  }

  join (str = ',') {
    return this.toNative().join(str)
  }

  toString () {
    return this.toNative().map((item) => item.toString()).join('\n')
  }

  // push, pop, unshift, shift for rows
  pushRow (...rows) {
    rows.forEach((row) => {
      if (row.length !== this.width) { return this.height }
      this.height += 1
      this[this.height - 1] = row
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
    const res = this.clone()

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
    const res = this.clone()

    arrays.forEach((array, i) => {
      if (array.width === this.width) {
        array.forEachRow((row) => {
          res.pushRow(row)
        })
      }
    })

    return res
  }

  reverseRows () {
    return this.fromNative(this.toNative().reverse())
  }

  reverseColumns () {
    const copy = this.clone()

    this.forEachColumn((_, x) => {
      this.setColumn(this.width - 1 - x, copy.atColumn(x))
    })

    return this
  }

  // returns a 'cloned' self
  clone () {
    const res = new Array2d(this.height, this.width)

    for (let i = 0; i < this.height; i += 1) {
      // must use concat, and not spread, as spread creates undefined items
      res[i] = this[i].concat()
    }

    return res
  }
}

module.exports = Array2d
