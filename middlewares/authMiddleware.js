const jwt = require('jsonwebtoken');

const authMiddleware = {
  authenticate(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Akses ditolak. Token tidak tersedia.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token tidak valid atau kadaluarsa.' });
    }
  }
};

module.exports = authMiddleware;