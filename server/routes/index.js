const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authentication')

const { getalldata, createPost } = require('../controllers/index.controller')

router.get('/', getalldata)
router.post('/createpost', middleware.authPost, createPost)


module.exports = router;
