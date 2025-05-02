const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    // Validasi input
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Username, email dan password diperlukan!"
      });
    }

    // Buat user baru
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    res.status(201).send({
      message: "User berhasil didaftarkan!",
      userId: user.id
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Terjadi kesalahan saat mendaftarkan user."
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Cari user
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(404).send({
        message: "User tidak ditemukan."
      });
    }

    // Verifikasi password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Password tidak valid!"
      });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 jam
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Terjadi kesalahan saat login."
    });
  }
};