const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer