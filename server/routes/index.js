const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authentication')

const { getalldata, createPost, userData, votingSystem, getSpecificPostId } = require('../controllers/index.controller')

router.get('/', getalldata)
router.post('/createpost', middleware.authPost, createPost)
router.get('/userdata', userData)
router.post('/votingsystem', middleware.authPost, votingSystem)
router.get('/:postid', getSpecificPostId)

module.exports = router;
