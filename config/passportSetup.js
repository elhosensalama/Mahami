const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    function (accessToken, refreshToken, profile, done) {
      // Get user's info.
      const { id, displayName } = profile
      const email = profile.emails[0].value

      User.findOne({ googleId: id }).then((currUser) => {
        if (currUser) {
          done(null, currUser)
        } else {
          // Create a new user
          const user = new User({
            googleId: id,
            name: displayName,
            email: email,
          })
          user.save().then((newUser) => {
            done(null, newUser)
          })
        }
      })
    }
  )
)
