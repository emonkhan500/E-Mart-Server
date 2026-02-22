const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, cartController.addToCart);

router.get("/:userEmail", verifyToken, cartController.getCart);

router.delete("/:id", verifyToken, cartController.deleteCartItem);

module.exports = router;