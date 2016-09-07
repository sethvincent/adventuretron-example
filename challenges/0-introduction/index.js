var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var next = require('adventuretron/next')

module.exports = {
  i18n: require('./i18n'),
  content: function (state, prev, send) {
    var filepath = path.join(__dirname, 'content_' + state.i18n.current + '.md')
    var description = markdown.readFileSync(filepath)
    var nextOptions = {
      onclick: function onclick (e) {
        send('challenges:next')
      }
    }

    return html`<div>
      ${description}
      ${next(nextOptions)}
    </div>`
  }
}
