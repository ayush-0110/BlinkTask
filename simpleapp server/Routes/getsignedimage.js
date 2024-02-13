const express = require('express');
const router = express.Router();
const { generateGetSignedUrl } = require('../Controllers/getsigned');

router.get('/images/:fileName', generateGetSignedUrl);

module.exports = router;