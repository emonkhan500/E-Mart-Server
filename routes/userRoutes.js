const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");
const userController = require("../controllers/userController");

// JWT
router.post("/jwt", userController.generateJWT);

// Create user
router.post("/", userController.createUser);

// Get all users (admin only)
router.get("/", verifyToken, verifyAdmin, userController.getUsers);
router.delete("/:id", verifyToken, verifyAdmin, userController.deleteUser);

// Make admin
router.patch("/admin/:id", verifyToken, verifyAdmin, userController.makeAdmin);

// Check admin status
router.get("/admin", verifyToken, userController.checkAdmin);
// role check
router.get("/role/:email", userController.getUserRole);

module.exports = router;