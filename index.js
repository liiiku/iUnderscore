(function() {
  var root = (typeof self === 'object' && self.self === self && self) ||
             (typeof global === 'object'&& global.global === global && global ) ||
             this ||
             {}
  
  /**
   * var _ = {} 这样可以比较方便的挂在函数，但是这样没法_().each() 调用函数，所以要用一个函数返回一个对象的方式
   * 函数中this默认指向window 怎么才能让this指向这个函数对象呢？
   * function a() {}   new a() // a {} 这样就是一个类似对象的东西了
   * _() 就返回的是new _()这样的东西，所以
   * _().__proto__ === _.prototype // true
   * _() // _ {_wrapped: undefined}
   * 但是现在希望能够_().log() 也可以调用
   */
  var _ = function(obj) {
    if (!(this instanceof _)) return new _(obj)
    this._wrapped = obj
  }

  root._ = _

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key]
    }
  }

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
  var getLength = property('length')

  /**
   * 这样只是挂在到了_函数对象上，并没有挂到函数原型上，所以_.log()可以调用，但是_().log()就会报错
   * 所以现在需要将_上的方法，挂到_.prototype上
   */
  _.log = function(str) {
    console.log(str)
  }

  // 判断集合是否近似数组 是有bug的 var obj = {length: 0}
  var isArrayLike = function(collection) {
    if (Object.keys(collection).indexOf('length') > -1) return false // 用来解决var obj = {length: 0} 的问题
    var length = getLength(collection)
    console.log(43, length)
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
  }

  /**
   * 数组扁平化
   * @param {*} input 要处理的数组
   * @param {*} shallow 是否只扁平一层
   * @param {*} strict 是否严格处理元素 也就是如果不是数组的话，怎么处理
   * @param {*} output 输出
   */
  function flatten(input, shallow, strict, output) {
    output = output || []
    var idx = output.length

    for (var i = 0, len = input.length; i < len; i++) {
      var value = input[i]

      if (Array.isArray(value)) {
        if (shallow) {
          var j = 0, length = value.length
          while (j < length) output[idx++] = value[j++]
        } else {
          flatten(value, shallow, strict, output)
          idx = output.length
        }
      } else if (!strict) {
        output[idx++] = value
      }
    }

    return output
  }

  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false)
  }

  // 遍历数组和对象
  _.each = function(obj, callback) {
    var length, i = 0
    if (isArrayLike(obj)) {
      length = obj.length
      console.log(52, obj, length)
      for ( ; i < length; i++) { // 这一步判断的时候，就把 var obj = {length: 0} 的情况给过滤掉了，直接就不执行了
        if (callback.call(obj[i], i, obj[i]) === false) break
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], i, obj[i]) === false) break
      }
    }

    return obj
  }

  _.isFunction = function(obj) {
    return typeof obj === 'function' || false
  }

  _.functions = function(obj) {
    var names = []
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key)
    }
    return names.sort()
  }

  var ArrayProto = Array.prototype
  var push = ArrayProto.push
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(index, name) {
      console.log(79, name)
      var func = _[name] = obj[name]
      _.prototype[name] = function() {
        var args = [this._wrapped]
        push.apply(args, arguments);
        return func.apply(_, args)
      }
    })
    console.log(86, _.prototype[name])
    return _
  }

  _.mixin(_)

  // var obj = {length: 0}
  // isArrayLike(obj)
})()

var arr = [1, 2, [3, [4, 5]]]
// console.log(_([1, 2, 3]))
// _.log('123')
// _('123').log()
// _([1, 2, 3]).each(function(index, item) {console.log(index, item)})
// _.each([1, 2, 3], function(index, item) {console.log(index, item)})
_.each({length: 0, b: 2}, function(index, item) {console.log(105, item)})
console.log(_.flatten(arr, true))