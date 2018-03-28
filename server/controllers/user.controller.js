const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 10;

module.exports = {
  signUp (req,res) {
    console.log(req.body)
    const { username, email, password } = req.body
    User.findOne({email: email})
    .exec()
    .then(user => {
      if(user) {
        res.status(500).json({
          message: `${email} has already been used`
        })
      }else{
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
          username, email, password: hash
        })
        newUser.save()
        .then(newUserData => {
        const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),data:{email: newUser.email, userid: newUser._id}}, 'secret_key');
        res.status(200).json(token)
        })
      }
    })
  },

  log_in (req,res) {
    const { email, password } = req.body
    User.findOne({email: email})
    .exec()
    .then(user => {
      console.log(user)
      if (user) {
        console.log(password)
        console.log(user.password)
        let check = bcrypt.compareSync(password, user.password);
        console.log(check)
        console.log('hello2')
        if (check) {
          const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), data:{email: user.email, userid: user._id}}, 'secret_key');
          console.log(token)
          res.status(200).json(token)
        } else {
          console.log('error pass')
          res.status(500).json({
            message: `Password wrong`
          })
        }
      }else{
        console.log('error email')
        res.status(404).json({
          message: `Email does not exist`
        })
      }
    })
  }
}