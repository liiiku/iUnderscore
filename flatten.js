function flatten1(arr) {
  return arr.reduce(function(result, cur) {
    return result.concat(Array.isArray(cur) ? flatten1(cur) : cur)    
  }, [])
}

function flatten2(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }

  return arr
}

let arr = [1, 2, [3, [4, 5]]]
console.log(flatten1(arr))
console.log(flatten2(arr))