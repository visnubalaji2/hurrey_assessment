const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { saveDetectionData } = require('../controllers/saveDataController');

router.post('/', auth, saveDetectionData);

module.exports = router;
