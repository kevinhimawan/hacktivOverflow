const Post = require('../model/post.model')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')

module.exports = {
  getalldata (req, res) {
    Post.find()
    .populate('user')
    .exec()
    .then(postData => {
      res.status(200).json(postData)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  createPost (req, res) {
    const {token, question, title} = req.body
    const {data} = jwt.verify(token, 'secret_key')
    const {email, userid} = data
    const newPost = new Post({
      user: userid, title, question
    })
    newPost.save()
    .then(newPostData => {
      User.update({'_id': userid},
        {'$push': {post: newPostData._id}},
      function (err, result){
        if (!err) {
          Post.find()
          .populate('user')
          .exec()
          .then(postData => {
            res.status(200).json(postData)
          })
          .catch(err => {
            res.status(500).json(err)
          })
        } else {
          res.status(500).json(err)
        }
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}