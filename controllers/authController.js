const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const User = require('../models/userModel');

const authController = {
  async register(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ 
          message: 'Password dan konfirmasi password tidak cocok' 
        });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await User.create({ name, email, password: hashedPassword });

      const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      const user = await User.findById(userId);

      res.status(201).json({
        message: 'Registrasi berhasil',
        token,
        user
      });

    } catch (error) {
      console.error('Error register:', error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  },

  // Login User
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Email atau password salah' });
      }

      // Cek password
      const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        console.log("Password comparison failed");
        return res.status(401).json({ message: 'Email atau password salah' });
        }

      // Generate token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      const { password: _, ...userData } = user;

      res.json({
        message: 'Login berhasil',
        token,
        user: userData
      });

    } catch (error) {
      console.error('Error login:', error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error get profile:', error);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  }
};

module.exports = authController;