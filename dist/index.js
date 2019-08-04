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

eval("class Array2d {\n  constructor (h = 0, w = 0) {\n    this.width = w\n    this.height = h\n    this._set(new Array(h).fill(null).map(() => new Array(w)))\n  }\n\n  // clear this objects \"array\"\n  _clear () {\n    let i = 0\n    while (this[i] !== undefined) {\n      delete this[i]\n      i += 1\n    }\n  }\n\n  // sets this object to an array\n  _set (arr) {\n    this._clear()\n\n    arr.forEach((item, i) => {\n      this[i.toString()] = item\n    })\n  }\n\n  // returns a 'cloned' self\n  _clone () {\n    const res = new Array2d(this.height, this.width)\n    res._set(this.toNative())\n    return res\n  }\n\n  // converts Array2d to normal matrix and returns\n  toNative () {\n    return new Array(this.height).fill(null).map((row, y) => this[y].concat())\n  }\n\n  fromNative (arr) {\n    this.height = arr.length\n    this.width = arr[0].length\n    this._set(arr)\n    // chain\n    return this\n  }\n\n  // itterative functions\n\n  // foreach\n  forEachRow (func) {\n    this.toNative().forEach((row, y) => {\n      func(row, y, this)\n    })\n  }\n\n  forEach (func) {\n    this.forEachRow((row, y) => {\n      row.forEach((item, x) => {\n        func(item, y, x, this)\n      })\n    })\n  }\n\n  forEachColumn (func) {\n    // empty array for columns\n    const columns = new Array(this.width).fill(null).map(() => new Array(this.height).fill(null))\n\n    // for every item, switch axis, and put in columns\n    this.forEach((item, y, x) => {\n      columns[x][y] = item\n    })\n\n    // run on columns\n    columns.forEach((column, x) => {\n      func(column, x, this)\n    })\n  }\n\n  // maps\n  mapRows (func) {\n    // arr holds the contents of the result array\n    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))\n\n    this.forEachRow((row, y) => {\n      arr[y] = func(row, y, this) || new Array(this.width).fill(undefined)\n    })\n\n    // convert arr to new Array2d and return\n    const res = new Array2d(this.height, this.width)\n    res._set(arr)\n    return res\n  }\n\n  map (func) {\n    // same as mapRows\n    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))\n\n    this.forEach((item, y, x) => {\n      arr[y][x] = func(item, y, x, this)\n    })\n\n    const res = new Array2d(this.height, this.width)\n    res._set(arr)\n    return res\n  }\n\n  mapColumns (func) {\n    const arr = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null))\n\n    // call the callback for every column, and then map the new column into arr\n    this.forEachColumn((column, x) => {\n      const newColumn = func(column, x, this) || new Array(this.height).fill(undefined)\n\n      this.forEachRow((row, y) => {\n        arr[y][x] = newColumn[y]\n      })\n    })\n\n    const res = new Array2d(this.height, this.width)\n    res._set(arr)\n    return res\n  }\n\n  every (func) {\n    let res = true\n\n    this.forEach((item, y, x) => {\n      res = res === true ? func(item, y, x, this) : res\n    })\n\n    return res\n  }\n\n  filter (func) {\n    const res = []\n    this.forEach((item, y, x) => {\n      if (func(item, y, x, this)) {\n        res.push(item)\n      }\n    })\n    return res\n  }\n\n  reduce (func, initialValue) {\n    let accumulator = initialValue || this[0][0]\n\n    this.forEach((item, y, x) => {\n      if (y === 0 && x === 0 && typeof initialValue === 'undefined') return null\n      accumulator = func(accumulator, item, y, x, this)\n    })\n\n    return accumulator\n  }\n\n  find (func) {\n    let res\n\n    this.forEachRow((row, y) => {\n      if (res === undefined) {\n        res = row.find((item, x) => {\n          return func(item, y, x, this)\n        })\n      }\n    })\n\n    return res\n  }\n\n  findIndex (func) {\n    return this.indexOf(this.find(func))\n  }\n\n  // fills array2d with val\n  fill (val, y1 = 0, x1 = 0, y2 = this.height, x2 = this.width) {\n    if (typeof y1 !== 'number') { y1 = 0 };\n    if (typeof x1 !== 'number') { x1 = 0 };\n    if (typeof y2 !== 'number') { y2 = this.height };\n    if (typeof x2 !== 'number') { x2 = this.width };\n\n    y1 = y1 < 0 ? this.height + y1 : y1\n    x1 = x1 < 0 ? this.width + x1 : x1\n    y2 = y2 < 0 ? this.height + y2 : y2\n    x2 = x2 < 0 ? this.width + x2 : x2\n\n    this.forEachRow((row, y) => {\n      if (y < y2 && y > y1 - 1) {\n        this[y] = this[y].fill(val, x1, x2)\n      };\n    })\n    return this._clone()\n  }\n\n  indexOf (val) {\n    // init res\n    const res = [-1, -1]\n\n    let y = 0\n\n    // for every row\n    for (const row of this.toNative()) {\n      // x result = index of val\n      res[1] = row.indexOf(val)\n\n      // y result = y if x was found\n      res[0] = res[1] !== -1 ? y : -1\n\n      // if found, break\n      if (res[1] !== -1) { break }\n\n      y += 1\n    }\n\n    return res\n  }\n\n  includes (val) {\n    return this.indexOf(val)[0] !== -1\n  }\n\n  join (str = ',') {\n    return this.toNative().map(row => row.join(str)).join(str)\n  }\n\n  // push, pop, unshift, shift for rows\n  pushRow (row) {\n    this[this.height] = row\n    this.height += 1\n\n    return this.height\n  }\n\n  popRow () {\n    const res = this[this.height - 1]\n    delete this[this.height - 1]\n\n    this.height -= this.height > 0 ? 1 : 0\n    return res\n  }\n\n  unshiftRow (row) {\n    const currentData = this.toNative()\n    const res = currentData.unshift(row)\n    this._set(currentData)\n\n    this.height += 1\n    return res\n  }\n\n  shiftRow () {\n    const currentData = this.toNative()\n    const res = currentData.shift()\n    this._set(currentData)\n\n    this.height -= this.height > 0 ? 1 : 0\n    return res\n  }\n\n  // push, pop, unshift, shift for columns\n  pushColumn (column) {\n    this.forEachRow((row, y) => { this[y].push(column[y]) })\n    this.width += 1\n    return this.width\n  }\n\n  popColumn () {\n    let popped = []\n\n    this.forEachRow((row, y) => {\n      popped.push(this[y].pop())\n    })\n\n    popped = typeof popped[0] === 'undefined' ? undefined : popped\n    this.width -= this.width > 0 ? 1 : 0\n    return popped\n  }\n\n  unshiftColumn (column) {\n    this.forEachRow((row, y) => { this[y].unshift(column[y]) })\n    this.width += 1\n    return this.width\n  }\n\n  shiftColumn () {\n    this.forEachRow((row, y) => { this[y].shift() })\n    this.width -= this.width > 0 ? 1 : 0\n    return this.width\n  }\n\n  // concat\n  concatHorizontal (...arrays) {\n    const res = this._clone()\n\n    arrays.forEach((array, i) => {\n      if (array.height === this.height) {\n        array.forEachColumn((column) => {\n          res.pushColumn(column)\n        })\n      }\n    })\n\n    return res\n  }\n\n  concatVertical (...arrays) {\n    const res = this._clone()\n\n    arrays.forEach((array, i) => {\n      if (array.width === this.width) {\n        array.forEachRow((row) => {\n          res.pushRow(row)\n        })\n      }\n    })\n\n    return res\n  }\n}\n\nmodule.exports = Array2d\n\n\n//# sourceURL=webpack://Array2d/./src/index.js?");

/***/ })

/******/ });
});