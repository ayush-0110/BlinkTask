const express = require('express');
const router = express.Router();
const { getImages } = require('../Controllers/getImages');
const authenticateToken = require('../middlewares/tokenAuthentication'); 

router.get('/getimages', authenticateToken, getImages);

module.exports = router;