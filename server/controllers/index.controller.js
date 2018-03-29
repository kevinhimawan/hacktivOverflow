const Post = require('../model/post.model')
const User = require('../model/user.model')
const Answer = require('../model/answer.model')
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
  userData (req, res) {
    const token = req.headers.token
    const decoded = jwt.verify(token, 'secret_key')
    if (decoded) {
      User.findOne({'_id': decoded.data.userid})
      .exec()
      .then(userData => {
        res.status(200).json(userData)
      })
    } else {
      res.status(500).json('err')
    }
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
  },
  votingSystem (req, res) {
    const {token, postid} = req.body
    const decoded = jwt.verify(token, 'secret_key')
    const {data} = decoded
    Post.findOne({'_id': postid})
    .populate('votes')
    .exec()
    .then(postData => {
      const checkiduser = postData.votes.filter(vote => {
        if (vote._id.toString() === data.userid.toString()) {
          return vote
        }
      })
      if (checkiduser.length > 0) {
        res.status(200).json({message:'Has already vote it before'})
      } else {
        Post.update({'_id': postid},
          {'$push': {votes: data.userid}},
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
          }
        })
      }
    })
  },
  getSpecificPostId (req, res) {
    const postid = req.params.postid
    Post.findOne({'_id': postid})
    .populate('answer')
    .populate('user')
    .exec()
    .then(postData => {
      res.status(200).json(postData)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
} 