const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, authorController.create);
router.get("/", authorController.findAll);
router.get("/:id", authorController.findOne);
router.put("/:id", authMiddleware, authorController.update);
router.delete("/:id", authMiddleware, authorController.delete);

module.exports = router;