const jwt = require('jsonwebtoken')

module.exports = {
  auth (req, res, next) {
    const token = req.headers.token
    if (token) {
      try {
        const decoded = jwt.verify(token, 'secret_key');
        next ()
      } catch(err) {
        next(err)
      }
    } else {
      next (`Cannot come to this site`)
    } 
  },
  authPost (req, res, next) {
    const token = req.body.token
    console.log(token)
    if (token) {
      try {
        const decoded = jwt.verify(token, 'secret_key');
        next ()
      } catch(err) {
        next(err)
      }
    } else {
      next (`Cannot come to this site`)
    } 
  },
  expired (req, res, next) {
    const token = req.headers.token
    if (token) {
      try {
        const {exp} = jwt.verify(token, 'secret_key')
        let timenow = Date.parse(new Date()) / 1000
        if (exp < timenow) {
        } else {
          next ()
        }
      } catch (err) {
        next(err)
      }
    } else {
      next (`Cannot come to this site`)
    }
  }
}