const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const userSchema = new Schema({
  googleId: String,
  name: String,
  tasks: {
    type: [{ text: String, complete: Boolean }],
    default: [],
  },
  email: String,
})

module.exports = mongoose.model('user', userSchema)
