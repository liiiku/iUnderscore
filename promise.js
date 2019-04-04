// 找出一个目录中最大的文件

var fs = require('fs')
var path = require('path')

// function findLargest(dir, cb) {
//   fs.readdir(dir, function(er, files) {
//     if (er) return cb(er)

//     var counter = files.length
//     var errored = false
//     var stats = []
//     console.log(13, files)

//     files.forEach(function(file, index) {
//       console.log(file)
//       // 读取文件信息
//       fs.stat(path.join(dir, file), function(er, stat) {
//         if (errored) return
//         if (er) {
//           errored = true
//           return cb(er)
//         }

//         console.log(25, stat)
//         stats[index] = stat

//         if (--counter == 0) {
//           var largest = stats.filter(function(stat) { return stat.isFile()})
//                              .reduce(function(prev, next) {
//                                console.log(31, prev, next)
//                                if (prev.size > next.size) return prev
//                                return next 
//                              })
//           console.log(32, largest)
//           cb(null, files[stats.indexOf(largest)])
//         }
//       })
//     })
//   })
// }

// promise 实现
var readDir = function(dir) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dir, function(er, files) {
      if (er) reject(er)
      resolve(files)
    })
  })
}

var stat = function(path) {
  return new Promise(function(resolve, reject) {
    fs.stat(path, function(er, stat) {
      if (er) reject(er)
      resolve(stat)
    })
  })
}

function findLargest(dir) {
  return readDir(dir)
    .then(function(files) {
      let promises = files.map(file => stat(path.join(dir, file)))
      return Promise.all(promises).then(function(stats) {
        return { stats, files }
      })
    })
    .then(data => {
      let largest = data.stats
          .filter(function(stat) {return stat.isFile()})
          .reduce((prev, next) => {
            if (prev.size > next.size) return prev
            return next
          })
      return data.files[data.stats.indexOf(largest)]
    })
}

// findLargest('./', function(er, filename) {
//   if (er) return console.error(er)
//   console.log('largest file was:', filename)
// })

findLargest('./')
  .then(filename => {
    console.log('largest file was:', filename)
  })