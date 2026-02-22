const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", userController.createUser);
router.get("/", verifyToken, userController.getUsers);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;