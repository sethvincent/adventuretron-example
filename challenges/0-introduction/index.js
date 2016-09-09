var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var next = require('adventuretron/next')

var i18n = require('./i18n')

module.exports = {
  i18n: i18n,
  content: function (params, send) {
    var lang = params.language
    var challenge = params.challenge
    var description = challenge.description[lang]
    var nextOptions = i18n[lang].next
    nextOptions.onclick = function onclick (e) {
      send('challenges:next')
    }

    return html`<div>
      ${description}
      ${next(nextOptions)}
    </div>`
  }
}
