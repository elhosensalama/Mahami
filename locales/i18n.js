const i18n = require('i18n')

i18n.configure({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  queryParameter: 'lang',
  directory: './locales',
})

module.exports = i18n