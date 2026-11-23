const express = require('express');
const router = express.Router();
const { validateComment } = require('../middleware/validation');

const { createComment, getAllcomment } = require('../controllers/commentController');

router.post('/createComment', validateComment, createComment);
router.get('/getAllcomment/:photoId', getAllcomment);
module.exports = router;