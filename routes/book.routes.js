const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, bookController.create);
router.get("/", bookController.findAll);
router.get("/:id", bookController.findOne);
router.put("/:id", authMiddleware, bookController.update);
router.delete("/:id", authMiddleware, bookController.delete);

module.exports = router;