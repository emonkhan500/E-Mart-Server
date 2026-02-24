const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const cartController = require("../controllers/cartController");

router.post("/", verifyToken, cartController.addCart);
router.get("/:userEmail", verifyToken, cartController.getCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;