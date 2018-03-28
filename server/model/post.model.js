const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  question: String,
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  answer:[{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post