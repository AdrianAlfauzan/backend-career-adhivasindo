const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/name", verifyToken, searchController.findByName);
router.get("/nim", verifyToken, searchController.findByNim);
router.get("/ymd", verifyToken, searchController.findByYmd);
router.get("/all", verifyToken, searchController.getAllExternalData);

module.exports = router;
