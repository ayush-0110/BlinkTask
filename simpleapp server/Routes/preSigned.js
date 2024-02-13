const express = require('express');
const router = express.Router();
const { generatePresignedUrl } = require('../Controllers/preSigned');
const authenticateToken = require('../middlewares/tokenAuthentication'); 

router.get('/generate-presigned-url', authenticateToken, generatePresignedUrl);

module.exports = router;