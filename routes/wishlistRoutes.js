const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const wishlistController = require("../controllers/wishlistController");

router.post("/", verifyToken, wishlistController.addWishlist);
router.get("/:userEmail", verifyToken, wishlistController.getWishlist);
router.delete("/:id", wishlistController.deleteWishlist);

module.exports = router;