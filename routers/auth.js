const router = require('express').Router()
const {
  login,
  logout,
  receiveGoogleEmailInfo,
  googleAuth,
  redirectToHomePage,
} = require('../controllers/authController')

router.get('/login', login)
router.get('/logout', logout)
router.get('/google', receiveGoogleEmailInfo) // select email and get information
router.get('/google/redirect', googleAuth, redirectToHomePage) // after get info redirect to home page

module.exports = router
