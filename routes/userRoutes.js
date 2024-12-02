const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Version 1 routes
router.get("/api/v1/users/:userId/recentlyViewed", userController.getRecentlyViewed);
router.post("/api/v1/users/:userId/recentlyViewed", userController.logProductView);

module.exports = router;
