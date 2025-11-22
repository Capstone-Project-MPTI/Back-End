const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.authenticate, scanController.saveScan);
router.get('/:userId', authMiddleware.authenticate, scanController.getHistory);

module.exports = router;