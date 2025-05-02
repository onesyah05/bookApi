const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      message: "Token tidak disediakan!"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Tidak terotentikasi!"
    });
  }
};

module.exports = verifyToken;