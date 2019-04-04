// apply 数组 call 参数列表
Array.prototype.selfMap = function() {
  const arr = this
  const result = []
  const [ fn, thisArg ] = [].slice.call(arguments)
  console.log(6, thisArg)
  console.log(7, arguments)
  if (typeof fn !== 'function') {
    throw new TypeError(fn + 'is not a function')
  }
  for (let i = 0; i < arr.length; i++) {
    result.push(fn.call(thisArg, arr[i]))
  }
  return result
}

const a = new Array(1, 2, 3, 4)
console.log(a.selfMap(item => item + 1))

const reduceMap = (fn, thisArg) => {
  return (list) => {
    if (typeof fn !== 'function') {
      throw new TypeError(fn + 'is not a function')
    }
    if (!Array.isArray(list)) {
      throw new TypeError('list must be a Array')
    }
    if (list.length === 0) return []
    return list.reduce((result, cur, index) => {
      result.push(fn.call(thisArg, cur))
      return result
    }, [])
  }
}

console.log(reduceMap(x => x+1)([1, 2, 3, 5]))