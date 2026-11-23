const express = require('express');
const router = express.Router();
const { createPhoto, getPhoto, getAllPhoto, deletePhoto } = require('../controllers/photoController');
const upload = require('../middleware/upload');
const { validatePhoto } = require('../middleware/validation');

router.post('/createPhoto', upload.single('photo'), validatePhoto, createPhoto);
router.get('/getPhoto/:id', getPhoto);
router.get('/getAllPhoto', getAllPhoto);
router.delete('/deletePhoto/:id/:userId', deletePhoto);

module.exports = router;