// 第一版
// var curry = function (fn) {
//   var args = [].slice.call(arguments, 1)
//   console.log(4, arguments)
//   console.log(5, args)
//   return function() {
//     var newArgs = args.concat([].slice.call(arguments))
//     console.log(8, arguments)
//     console.log(9, this)
//     return fn.apply(this, newArgs)
//   }
// }

// function add (a, b) {
//   return a + b
// }

// var addCurry = curry(add, 1, 2)
// console.log(19, addCurry())
// var addCurry = curry(add, 1)
// console.log(21, addCurry(2))
// var addCurry = curry(add)
// console.log(23, addCurry(1, 2))

// 第二版
// function sub_curry(fn) {
//   console.log(27, fn)
//   return function() {
//     return fn()
//   }
// }

// function curry(fn, length) {
//   console.log(34, length)
//   length = length || 4
//   return function() {
//     if (length > 1) {
//       return curry(sub_curry(fn), --length)
//     } else {
//       return fn()
//     }
//   }
// }

// var fn0 = function() {
//   console.log(1)
// }

// var fn1 = curry(fn0)

// fn1()()()

// // 第三版
// var curry = (fn, ...args) =>
//         fn.length <= args.length
//             ? fn(...args)
//             : curry.bind(null, fn, ...args)

var curry = function(fn, ...args) {
  console.log(60, fn.length)
  console.log(61, args.length)
  console.log(62, args)
  if (fn.length <= args.length) {
    return fn(...args)
  } else {
    console.log(66, ...args)
    return curry.bind(null, fn, ...args)
  }
}

var fn = curry(function(a, b, c) {
  console.log([a, b, c])
})

fn(1, 2, 3)
fn(1, 2)(3)
fn(1)(2, 3)
fn(1)(2)(3)


