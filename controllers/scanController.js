const db = require('../config/db');

exports.saveScan = async (req, res) => {
  try {
    const { imageUrl, result } = req.body;
    const userId = req.user.id;

    const [rows] = await db.query(
      `INSERT INTO scan_history (user_id, image_url, result) 
       VALUES (?, ?, ?)`,
      [userId, imageUrl, result]
    );

    res.status(201).json({ 
      success: true, 
      data: { id: rows.insertId, imageUrl, result } 
    });
  } catch (error) {
    console.error("Error save scan:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, image_url, result, created_at 
       FROM scan_history 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.params.userId]
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error get history:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};