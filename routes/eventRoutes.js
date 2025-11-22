const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.authenticate, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/search', eventController.searchEvents);
router.get('/:id', eventController.getEventById);

module.exports = router;