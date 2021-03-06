var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var valueInput = require('adventuretron/value-input')
var next = require('adventuretron/next')

var i18n = require('./i18n')

module.exports = {
  i18n: i18n,
  content: function (params, send) {
    var lang = params.language
    var challenge = params.challenge
    var description = challenge.description[lang]

    if (challenge.success) {
      var nextOptions = i18n[lang].next
      nextOptions.onclick = function onclick (e) {
        send('challenges:next')
      }

      return html`<div>
        <h1>You did it!</h2>
        ${next(nextOptions)}
      </div>`
    } else {
      var inputOptions = {
        headerText: 'Enter the word "cool"',
        descriptionText: 'That\'s really all you have to do',
        placeholder: 'you should type "cool" here',
        verify: function (answer) {
          if (answer === 'cool') {
            send('challenges:success', answer)
          } else {
            send('challenges:error', answer)
          }
        }
      }

      return html`<div>
        ${description}
        ${valueInput(inputOptions)}
      </div>`
    }
  }
}
