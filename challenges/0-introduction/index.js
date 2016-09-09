var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var next = require('adventuretron/next')

module.exports = {
  i18n: require('./i18n'),
  content: function (params, send) {
    var challenge = params.challenge
    var description = challenge.description[params.language]

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
