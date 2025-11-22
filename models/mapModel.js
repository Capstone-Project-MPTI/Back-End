const db = require('../config/db');

class MapLocation {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT id, name, address, lat, lng, type 
      FROM map_locations
      WHERE type IN ('TPS3R', 'Recycling Center')
      ORDER BY created_at DESC
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM map_locations WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(locationData) {
    const { name, address, lat, lng, type } = locationData;
    const [result] = await db.query(
      'INSERT INTO map_locations (name, address, lat, lng, type) VALUES (?, ?, ?, ?, ?)',
      [name, address, lat, lng, type]
    );
    return result.insertId;
  }

  static async update(id, locationData) {
    const { name, address, lat, lng, type } = locationData;
    await db.query(
      'UPDATE map_locations SET name = ?, address = ?, lat = ?, lng = ?, type = ? WHERE id = ?',
      [name, address, lat, lng, type, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM map_locations WHERE id = ?', [id]);
  }
}

module.exports = MapLocation;