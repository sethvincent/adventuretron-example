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
    require('./challenges/introduction'),
    require('./challenges/next-steps')
  ]
})

app.start()
