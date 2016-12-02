var fs = require('fs')

module.exports = readAndMerge

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function parse(jsonString) {
  try {
    var result = JSON.parse(jsonString)
  } catch (e) {
    return Promise.reject(e)
  }

  return Promise.resolve(result)
}

function merge(objArray) {
  return new Promise((resolve, reject) => {
    var obj1 = objArray[0]
    var obj2 = objArray[1]
    var obj1keys = Object.keys(obj1)
    var obj2keys = Object.keys(obj2)
    var result = {}
    obj1keys.forEach(val => {
      if (obj2keys.indexOf(val) >= 0 && typeof obj1[val] === 'object')
        result[val] = Object.assign({}, obj1[val], obj2[val])
    })

    var merged = Object.assign({}, obj1, obj2, result)
    resolve(merged)
  })
}

function readAndMerge() {
  return Promise.all([
      readFile('./target.json').then(parse),
      readFile('./master.json').then(parse)
    ])
    .then(merge)
    .catch(err => { throw err })
}

