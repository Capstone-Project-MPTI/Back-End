const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/locations', mapController.getAllLocations);
router.get('/locations/:id', mapController.getLocationById);

// Protected routes (require authentication)
router.post('/locations', authMiddleware.authenticate, mapController.createLocation);
router.put('/locations/:id', authMiddleware.authenticate, mapController.updateLocation);
router.delete('/locations/:id', authMiddleware.authenticate, mapController.deleteLocation);

module.exports = router;