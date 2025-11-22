const MapLocation = require('../models/mapModel');

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await MapLocation.getAll();
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLocationById = async (req, res) => {
  try {
    const location = await MapLocation.getById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const id = await MapLocation.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    await MapLocation.update(req.params.id, req.body);
    res.json({ message: 'Location updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    await MapLocation.delete(req.params.id);
    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};