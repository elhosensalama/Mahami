const passport = require('passport')

const login = (req, res) => {
  if (req.user) res.redirect('/')
  else res.render('login')
}

const logout = (req, res) => {
  req.logOut()
  res.redirect('./login')
}

const receiveGoogleEmailInfo = passport.authenticate('google', {
  scope: ['profile', 'email'],
})

const googleAuth = passport.authenticate('google')

const redirectToHomePage = (req, res) => {
  res.redirect('/')
}

module.exports = {
  login,
  logout,
  receiveGoogleEmailInfo,
  googleAuth,
  redirectToHomePage,
}
