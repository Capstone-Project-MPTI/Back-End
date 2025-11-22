const Event = require('../models/eventModel');

const eventController = {
  createEvent: async (req, res) => {
    try {
      const { title, description, preview_text, thumbnail_url, event_date } = req.body;
      const user_id = req.user.id;

      const event = await Event.create({
        title,
        description,
        preview_text,
        thumbnail_url,
        event_date,
        user_id
      });

      res.status(201).json({
        success: true,
        data: event
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Gagal membuat event'
      });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.json({
        success: true,
        data: events
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data event'
      });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event tidak ditemukan'
        });
      }
      res.json({
        success: true,
        data: event
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil detail event'
      });
    }
  },

  searchEvents: async (req, res) => {
    try {
      const { keyword } = req.query;
      const events = await Event.search(keyword || '');
      res.json({
        success: true,
        data: events
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Gagal melakukan pencarian event'
      });
    }
  }
};

module.exports = eventController;