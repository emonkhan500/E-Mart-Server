const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlistController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, wishlistController.addToWishlist);

router.get("/:userEmail", verifyToken, wishlistController.getWishlist);

router.delete("/:id", verifyToken, wishlistController.deleteWishlistItem);

module.exports = router;