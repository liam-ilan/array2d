(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Array2d"] = factory();
	else
		root["Array2d"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Array2d {\n  constructor (h = 0, w = 0) {\n    this._width = w\n    this._height = h\n\n    if (typeof this[0] === 'undefined') {\n      for (let i = 0; i < h; i += 1) {\n        // create keys for direct access\n        // e.g. arr[4][2]\n        this[i] = new Array(w)\n      }\n    }\n  }\n\n  // setting width and height is equivalent to setting length of native array\n  set width (w) {\n    this.forEachRow((row) => { row.length = w })\n    this._width = w\n  }\n\n  get width () {\n    return this._width\n  }\n\n  set height (h) {\n    if (h > this.height) {\n      for (let i = this.height; i < h; i += 1) {\n        this[i] = new Array(this.width)\n      }\n    }\n\n    if (h < this.height) {\n      for (let i = this.height; i >= h; i -= 1) {\n        delete this[i]\n      }\n    }\n\n    this._height = h\n  }\n\n  get height () {\n    return this._height\n  }\n\n  // clear this object's keys (used by fromNative)\n  _clear () {\n    let i = 0\n    while (typeof this[i] !== 'undefined') {\n      delete this[i]\n      i += 1\n    }\n  }\n\n  // set this object's keys (used by fromNative))\n  _set (arr) {\n    arr.forEach((row, i) => {\n      // create keys for direct access\n      // e.g. arr[4][2]\n      this[i] = row\n    })\n  }\n\n  // creates an Array2d from native Array and returns\n  fromNative (arr) {\n    this.height = arr.length\n    this.width = arr.length === 0 ? 0 : arr[0].length\n\n    this._clear()\n    this._set(arr)\n\n    // chain\n    return this\n  }\n\n  // converts Array2d to native Array and returns\n  toNative () {\n    // we expect an empty array to return rows of empty items\n    // must use concat, and not spread, as spread creates undefined items.\n    return new Array(this.height).fill(null).map((row, y) => this[y].concat())\n  }\n\n  // get and set\n  getColumn (index) {\n    const column = []\n    for (let y = 0; y < this.height; y += 1) {\n      column.push(this[y][index])\n    }\n    return column\n  }\n\n  getRow (index) {\n    // must use concat, and not spread, as spread creates undefined items\n    return this[index].concat()\n  }\n\n  setColumn (index, arr) {\n    if (arr.length === this.height) {\n      for (let y = 0; y < this.height; y += 1) {\n        this[y][index] = arr[y]\n      }\n    }\n  }\n\n  setRow (index, arr) {\n    if (arr.length === this.width) {\n      this[index] = arr.concat()\n    }\n  }\n\n  // iterative functions\n\n  // forEach\n\n  // basic loop over rows\n  forEachRow (func) {\n    let y = 0\n    while (typeof this[y] !== 'undefined') {\n      func(this[y], y, this)\n      y += 1\n    }\n  }\n\n  forEach (func) {\n    this.forEachRow((row, y) => {\n      row.forEach((item, x) => {\n        func(item, y, x, this)\n      })\n    })\n  }\n\n  forEachColumn (func) {\n    for (var x = 0; x < this.width; x += 1) {\n      const column = this.getColumn(x)\n      func(column, x, this)\n    }\n  }\n\n  // maps\n  mapRows (func) {\n    const res = new Array2d(this.height, this.width)\n\n    this.forEachRow((item, y, array) => {\n      res[y] = func(item, y, array) || new Array(this.width).fill(undefined)\n    })\n\n    return res\n  }\n\n  map (func) {\n    return this.mapRows((row, y) => {\n      return row.map((item, x) => {\n        return func(item, y, x, this)\n      })\n    })\n  }\n\n  mapColumns (func) {\n    const res = new Array2d(this.height, this.width)\n\n    this.forEachColumn((column, x) => {\n      res.setColumn(x, func(column, x, this) || new Array(this.height).fill(undefined))\n    })\n\n    return res\n  }\n\n  every (func) {\n    let y = 0\n\n    while (typeof this[y] !== 'undefined') {\n      if (!this[y].every((item, x) => func(item, y, x, this))) return false\n      y += 1\n    }\n\n    return true\n  }\n\n  some (func) {\n    let y = 0\n\n    while (typeof this[y] !== 'undefined') {\n      if (this[y].some((item, x) => func(item, y, x, this))) return true\n      y += 1\n    }\n\n    return false\n  }\n\n  filter (func) {\n    const res = []\n\n    this.forEach((item, y, x) => {\n      if (func(item, y, x, this)) {\n        res.push(item)\n      }\n    })\n\n    return res\n  }\n\n  reduce (func, initialValue) {\n    let accumulator = typeof initialValue === 'undefined' ? this[0][0] : initialValue\n\n    this.forEach((item, y, x) => {\n      if (y === 0 && x === 0 && typeof initialValue === 'undefined') return null\n      accumulator = func(accumulator, item, y, x, this)\n    })\n\n    return accumulator\n  }\n\n  find (func) {\n    let res\n    let y = 0\n\n    while (typeof this[y] !== 'undefined') {\n      res = this[y].find((item, x) => { return func(item, y, x, this) })\n\n      if (typeof res !== 'undefined') break\n      y += 1\n    }\n\n    return res\n  }\n\n  findIndex (func) {\n    return this.indexOf(this.find(func))\n  }\n\n  // fills array2d with val\n  fill (val, y1 = 0, x1 = 0, y2 = this.height, x2 = this.width) {\n    if (typeof y1 !== 'number') { y1 = 0 };\n    if (typeof x1 !== 'number') { x1 = 0 };\n    if (typeof y2 !== 'number') { y2 = this.height };\n    if (typeof x2 !== 'number') { x2 = this.width };\n\n    y1 = y1 < 0 ? this.height + y1 : y1\n    x1 = x1 < 0 ? this.width + x1 : x1\n    y2 = y2 < 0 ? this.height + y2 : y2\n    x2 = x2 < 0 ? this.width + x2 : x2\n\n    this.forEachRow((row, y) => {\n      if (y < y2 && y > y1 - 1) {\n        this[y] = this[y].fill(val, x1, x2)\n      };\n    })\n    return this\n  }\n\n  slice (y1 = 0, x1 = 0, y2 = this.height, x2 = this.width) {\n    if (typeof y1 !== 'number') { y1 = 0 };\n    if (typeof x1 !== 'number') { x1 = 0 };\n    if (typeof y2 !== 'number') { y2 = this.height };\n    if (typeof x2 !== 'number') { x2 = this.width };\n\n    y1 = y1 < 0 ? this.height + y1 : y1\n    x1 = x1 < 0 ? this.width + x1 : x1\n    y2 = y2 < 0 ? this.height + y2 : y2\n    x2 = x2 < 0 ? this.width + x2 : x2\n\n    const res = new Array2d(y2 - y1, x2 - x1)\n\n    for (let y = y1; y < y2; y += 1) {\n      for (let x = x1; x < x2; x += 1) {\n        res[y - y1][x - x1] = this[y][x]\n      }\n    }\n\n    return res\n  }\n\n  indexOf (val) {\n    // init res\n    const res = { y: -1, x: -1 }\n\n    let y = 0\n\n    // for every row\n    for (const row of this.toNative()) {\n      // x result = index of val\n      res.x = row.indexOf(val)\n\n      // y result = y if x was found\n      res.y = res.x !== -1 ? y : -1\n\n      // if found, break\n      if (res.y !== -1) { break }\n\n      y += 1\n    }\n\n    return res\n  }\n\n  lastIndexOf (val) {\n    // init res\n    const res = { y: -1, x: -1 }\n\n    // for every row\n    for (let y = this.height - 1; y >= 0; y -= 1) {\n      // x result = index of val\n      res.x = this[y].lastIndexOf(val)\n\n      // y result = y if x was found\n      res.y = res.x !== -1 ? y : -1\n\n      // if found, break\n      if (res.y !== -1) { break }\n    }\n\n    return res\n  }\n\n  includes (val) {\n    return this.indexOf(val).x !== -1\n  }\n\n  join (str = ',') {\n    return this.toNative().join(str)\n  }\n\n  toString () {\n    return this.toNative().toString()\n  }\n\n  // push, pop, unshift, shift for rows\n  pushRow (...rows) {\n    rows.forEach((row) => {\n      if (row.length !== this.width) { return this.height }\n      this.height += 1\n      this[this.height - 1] = row\n    })\n\n    return this.height\n  }\n\n  popRow () {\n    const res = this[this.height - 1]\n    delete this[this.height - 1]\n\n    this.height -= this.height > 0 ? 1 : 0\n    return res\n  }\n\n  unshiftRow (...rows) {\n    const data = this.toNative()\n\n    rows.forEach((row) => {\n      if (row.length !== this.width) { return this.height }\n      data.unshift(row)\n    })\n\n    this.fromNative(data)\n    return this.height\n  }\n\n  shiftRow () {\n    const data = this.toNative()\n    const res = data.shift()\n    this.fromNative(data)\n    return res\n  }\n\n  // push, pop, unshift, shift for columns\n  pushColumn (...columns) {\n    columns.forEach((column) => {\n      if (column.length === this.height) {\n        this.setColumn(this.width, column)\n        this.width += 1\n      }\n    })\n\n    return this.width\n  }\n\n  popColumn () {\n    let popped = []\n    this.forEachRow((row, y) => { popped.push(this[y].pop()) })\n\n    popped = typeof popped[0] === 'undefined' ? undefined : popped\n    this.width -= this.width > 0 ? 1 : 0\n    return popped\n  }\n\n  unshiftColumn (...columns) {\n    const data = this.toNative()\n\n    columns.forEach((column) => {\n      if (column.length !== this.height) { return this.width }\n      column.forEach((item, i) => { data[i].unshift(item) })\n    })\n\n    this.fromNative(data)\n    return this.width\n  }\n\n  shiftColumn () {\n    let shifted = []\n    this.forEachRow((row, y) => { shifted.push(this[y].shift()) })\n\n    shifted = typeof shifted[0] === 'undefined' ? undefined : shifted\n    this.width -= this.width > 0 ? 1 : 0\n    return shifted\n  }\n\n  // concat\n  concatHorizontal (...arrays) {\n    const res = this.clone()\n\n    arrays.forEach((array, i) => {\n      if (array.height === this.height) {\n        array.forEachColumn((column) => {\n          res.pushColumn(column)\n        })\n      }\n    })\n\n    return res\n  }\n\n  concatVertical (...arrays) {\n    const res = this.clone()\n\n    arrays.forEach((array, i) => {\n      if (array.width === this.width) {\n        array.forEachRow((row) => {\n          res.pushRow(row)\n        })\n      }\n    })\n\n    return res\n  }\n\n  // returns a 'cloned' self\n  clone () {\n    const res = new Array2d(this.height, this.width)\n\n    for (let i = 0; i < this.height; i += 1) {\n      // must use concat, and not spread, as spread creates undefined items\n      res[i] = this[i].concat()\n    }\n\n    return res\n  }\n}\n\nmodule.exports = Array2d\n\n\n//# sourceURL=webpack://Array2d/./src/index.js?");

/***/ })

/******/ });
});