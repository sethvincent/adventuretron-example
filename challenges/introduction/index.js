var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var marked = require('marked')

module.exports = {
  i18n: require('./i18n'),
  content: function (state, prev, send) {
    var filepath = path.join(__dirname, 'content_' + state.i18n.current + '.md')
    return marked(fs.readFileSync(filepath, 'utf8'))
  },
  solution: function () {
    // testable example solution returned in string

    return `
      var message = 'hello'
    `
  },
  verify: function (err) {
    // verify the user's solution
  }
}
