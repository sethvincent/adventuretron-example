var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var fileInput = require('adventuretron/file-input')
var next = require('adventuretron/next')

module.exports = {
  i18n: require('./i18n'),
  content: function (state, prev, send) {
    var filepath = path.join(__dirname, 'content_' + state.i18n.current + '.md')
    var description = markdown.readFileSync(filepath)
    var challenge = state.challenges.list[state.challenges.current]
    var value

    var inputOptions = {
      headerText: 'Write a module',
      descriptionText: 'Create a module that is a function that returns an object with the property "adventure."',
      verify: verify
    }

    function verify (code) {
      try {
        var answerFunction = new Function('return ' + code)()
        var answer = answerFunction('weee')
        console.log('answer', answer)
      } catch (err) {
        send('challenges:error', {
          answer: {
            output: answer,
            code: code
          },
          error: 'Incorrect!'
        })
      }

      if (answer && answer.adventure && answer.adventure === 'weee') {
        send('challenges:success', { output: answer, code: code })
      } else {
        send('challenges:error', {
          answer: {
            output: answer,
            code: code
          },
          error: 'Incorrect!'
        })
      }
    }

    if (challenge.success) {
      var nextOptions = {
        onclick: function onclick (e) {
          send('challenges:next')
        }
      }

      return html`<div>
        <h1>You did it! The example is over!</h2>
        <p>Thanks for trying out the adventuretron example!</p>
      </div>`
    } else if (challenge.error) {
      return html`<div>
        ${description}
        <h2>Something went wrong!</h2>
        ${JSON.stringify(challenge)}
        ${fileInput(inputOptions)}
      </div>`
    } else {
      return html`<div>
        ${description}
        ${fileInput(inputOptions)}
      </div>`
    }
  }
}
