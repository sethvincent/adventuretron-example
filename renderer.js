var path = require('path')
var createApp = require('adventuretron/renderer')
var css = require('sheetify')

css('adventuretron')

var app = createApp({
  defaultLanguage: 'en',
  languages: {
    'en': 'English',
    'es': 'Español'
  },
  i18n: path.join(__dirname, 'i18n'),
  challenges: [
    require('./challenges/0-introduction'),
    require('./challenges/1-value-input'),
    require('./challenges/2-code-input'),
    require('./challenges/3-file-input')
  ]
})

app.start()
