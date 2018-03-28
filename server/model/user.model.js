const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, `This username has already taken`]
  },
  email: {
    type: String,
    unique: [true, `This email has already taken`]
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'Commend'
  }],
  password: String
})

const User = mongoose.model('User', userSchema)
module.exports = User