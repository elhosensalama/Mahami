require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')

const passportSetup = require('./config/passportSetup')
const auth = require('./routers/auth')
const task = require('./routers/task')

const i18n = require('./locales/i18n')

const app = express()

const port = process.env.PORT || 8080

// View engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Cookie
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.CookieKey],
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Connect to the database

mongoose.set('useFindAndModify', false)

mongoose.connect(
  process.env.dbURL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    // Start the server
    app.listen(port, () =>
      console.log('> Server is running on http://localhost:' + port)
    )
  }
)

// Routers
app.use('/auth', auth)
app.use('/task', task)

// Home page
app.get('/', (req, res) => {
  if (req.user) {
    const tasks = req.user.tasks
    res.render('home', { tasks, i18n })
  } else res.redirect('/auth/login')
})

app.put('/', (req, res) => {
  i18n.setLocale(req.body.lang)
  const tasks = req.user.tasks
  res.render('home', { tasks, i18n })
})
